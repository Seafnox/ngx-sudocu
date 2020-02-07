import { Injectable } from '@angular/core';
import { areaCount, areaSize, boardSize } from '../../consts/config';
import { Board } from '../../interfaces/board';
import { OperationNames } from '../../consts/operationNames';
import { Cell } from '../../interfaces/cell';

@Injectable({
  providedIn: 'root'
})
export class GameGeneratorService {
  private limit = 2147483647;
  private pureNumber = 16807;
  private seed = this.generateSeed();
  public lastOperations: OperationNames[] = [];

  public generateSeed(): number {
    return Math.floor(Math.random() * this.limit);
  }

  public generateGame(seed: number, simplicity: number): Board {
    const board = this.generateBoard(seed);

    this.prepareEachRow(board, simplicity);
    this.prepareEachCol(board, simplicity);

    return board;
  }

  public generateBoard(seed: number): Board {
    this.seed = typeof seed === 'number' ? seed : this.seed;

    const nativeBoard = new Array(boardSize).fill(0).map((a, x) => this.generateRow(x));
    this.lastOperations = [];

    return this.randomizeBoard(nativeBoard);
  }

  private prepareEachRow(board: Board, simplicity: number): void {
    board.forEach(row => {
      const alreadyFilled = row.map((cell, index) => cell.isPermanent ? index : -1).filter(i => i !== -1);

      if (alreadyFilled.length < simplicity) {
        const notFilled = row.map((cell, index) => !cell.isPermanent ? index : -1).filter(i => i !== -1);
        const affectedPositions = this.randomFromList(simplicity - alreadyFilled.length, notFilled);

        affectedPositions.forEach(index => row[index].isPermanent = true);
      }
    });
  }

  private prepareEachCol(board: Board, simplicity: number): void {
    const transitedBoard = this.transit(board);
    this.prepareEachRow(transitedBoard, simplicity);
  }

  private generateRow(x: number): Cell[] {
    return new Array(boardSize).fill(0).map((a, y) => this.generateCell(x, y));
  }

  private generateCell(x: number, y: number): Cell {
    return {
      value: this.generateCellValue(x, y),
      isPermanent: false,
      hasError: false,
    };
  }

  private generateCellValue(x: number, y: number): number {
    if (y < areaSize) {
      return (x + y * areaCount) % boardSize + 1;
    }

    if (y < boardSize * 2 / areaCount) {
      return (x + y * areaCount + 1) % boardSize + 1;
    }

    return (x + y * areaCount + 2) % boardSize + 1;
  }

  private randomizeBoard(board: Board): Board {
    const operationCount = this.nextRandom() % 49 + 1;
    let tempBoard = board;

    for (let i = 0; i < operationCount; i++) {
      tempBoard = this.changeBoardOnce(tempBoard);
    }

    return tempBoard;
  }

  private changeBoardOnce(board: Board): Board {
    const actionCount = 5;
    const limitPart = this.limit / actionCount;
    const random = this.nextRandom();
    switch (true) {
      case random < limitPart: return this.initSplitRows(board);
      case random < limitPart * 2: return this.initSplitCols(board);
      case random < limitPart * 3: return this.initSplitRowAreas(board);
      case random < limitPart * 4: return this.initSplitColAreas(board);
      default: return this.initTransit(board);
    }
  }

  private initTransit(board: Board): Board {
    this.lastOperations.push(OperationNames.TRANSIT);
    return this.transit(board);
  }

  private transit(board: Board): Board {
    const newBoard: Board = [];

    board.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (!Array.isArray(newBoard[x])) {
          newBoard[x] = [];
        }

        newBoard[x][y] = cell;
      });
    });

    return newBoard;
  }

  private reverseTransit(board: Board): Board {
    const newBoard: Board = [];

    board.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (!Array.isArray(newBoard[x])) {
          newBoard[x] = [];
        }

        newBoard[row.length - x][board.length - y] = cell;
      });
    });

    return newBoard;
  }

  private initSplitRows(board: Board): Board {
    this.lastOperations.push(OperationNames.SPLIT_ROWS);
    return this.splitRows(board);
  }

  private splitRows(board: Board): Board {
    const takenAreaRow = this.nextRandomRange(areaCount);
    const taken1stRowInArea = this.nextRandomRange(areaSize);
    const taken2ndRowInArea = this.nextRandomRange(areaSize);

    if (taken1stRowInArea === taken2ndRowInArea) {
      return this.splitRows(board);
    }

    const taken1stRow = takenAreaRow * areaSize + taken1stRowInArea;
    const taken2ndRow = takenAreaRow * areaSize + taken2ndRowInArea;
    const row1st = board[taken1stRow];
    const row2nd = board[taken2ndRow];

    board[taken2ndRow] = row1st;
    board[taken1stRow] = row2nd;

    return board;
  }

  private initSplitCols(board: Board): Board {
    this.lastOperations.push(OperationNames.SPLIT_COLS);
    return this.splitCols(board);
  }

  private splitCols(board: Board): Board {
    const takenAreaCol = this.nextRandomRange(areaCount);
    const taken1stColInArea = this.nextRandomRange(areaSize);
    const taken2ndColInArea = this.nextRandomRange(areaSize);

    if (taken1stColInArea === taken2ndColInArea) {
      return this.splitCols(board);
    }

    const taken1stCol = takenAreaCol * areaSize + taken1stColInArea;
    const taken2ndCol = takenAreaCol * areaSize + taken2ndColInArea;

    board.forEach(row => {
      const cell1st = row[taken1stCol];
      const cell2nd = row[taken2ndCol];
      row[taken2ndCol] = cell1st;
      row[taken1stCol] = cell2nd;
    });

    return board;
  }

  private initSplitRowAreas(board: Board): Board {
    this.lastOperations.push(OperationNames.SPLIT_ROW_AREAS);
    return this.splitRowAreas(board);
  }

  private splitRowAreas(board: Board): Board {
    const taken1stAreaRow = this.nextRandomRange(areaCount);
    const taken2ndAreaRow = this.nextRandomRange(areaCount);

    if (taken1stAreaRow === taken2ndAreaRow) {
      return this.splitRowAreas(board);
    }

    for (let i = 0; i < areaSize; i++) {
      const taken1stRow = taken1stAreaRow * areaSize + i;
      const row1st = board[taken1stRow];
      const taken2ndRow = taken2ndAreaRow * areaSize + i;
      const row2nd = board[taken2ndRow];

      board[taken2ndRow] = row1st;
      board[taken1stRow] = row2nd;
    }

    return board;
  }

  private initSplitColAreas(board: Board): Board {
    this.lastOperations.push(OperationNames.SPLIT_COL_AREAS);
    return this.splitColAreas(board);
  }

  private splitColAreas(board: Board): Board {
    const taken1stAreaCol = this.nextRandomRange(areaCount);
    const taken2ndAreaCol = this.nextRandomRange(areaCount);

    if (taken1stAreaCol === taken2ndAreaCol) {
      return this.splitColAreas(board);
    }

    board.forEach(row => {
      for (let i = 0; i < areaSize; i++) {
        const taken1stCell = taken1stAreaCol * areaSize + i;
        const cell1st = row[taken1stCell];
        const taken2ndCell = taken2ndAreaCol * areaSize + i;
        const cell2nd = row[taken2ndCell];

        row[taken2ndCell] = cell1st;
        row[taken1stCell] = cell2nd;
      }
    });

    return board;
  }

  private randomFromList(count: number, list: number[]): number[] {
    const copy = list.slice();
    const countToRemove = copy.length - count;
    for (let i = 0; i < countToRemove; i++) {
      const indexToRemove = this.nextRandomRange(copy.length);
      copy.splice(indexToRemove, 1);
    }

    return copy;
  }

  private nextRandomRange(to: number, from: number = 0): number {
    return Math.floor((this.nextRandom() / this.limit) * to) + from;
  }

  private nextRandom(): number {
    this.seed = this.seed * this.pureNumber % this.limit;
    return this.seed;
  }
}
