import { Injectable } from '@angular/core';
import { xAreaCount, xAreaSize, xSize, yAreaCount, yAreaSize, ySize } from '../../consts/config';
import { Board } from '../../interfaces/board';
import { OperationNames } from '../../consts/operationNames';

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

  public generateBoard(seed: number): Board {
    this.seed = typeof seed === 'number' ? seed : this.seed;

    const nativeBoard = new Array(xSize).fill(0).map((a, x) => this.generateRow(x));
    this.lastOperations = [];

    return this.randomizeBoard(nativeBoard);
  }

  private generateRow(x: number): string[] {
    return new Array(ySize).fill(0).map((a, y) => this.generateCell(x, y).toString());
  }

  private generateCell(x: number, y: number): number {
    if (y < yAreaSize) {
      return (x + y * xAreaCount) % xSize + 1;
    }

    if (y < ySize * 2 / yAreaCount) {
      return (x + y * xAreaCount + 1) % xSize + 1;
    }

    return (x + y * xAreaCount + 2) % xSize + 1;
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

  private initSplitRows(board: Board): Board {
    this.lastOperations.push(OperationNames.SPLIT_ROWS);
    return this.splitRows(board);
  }

  private splitRows(board: Board): Board {
    const takenAreaRow = this.nextRandomRange(yAreaCount);
    const taken1stRowInArea = this.nextRandomRange(yAreaSize);
    const taken2ndRowInArea = this.nextRandomRange(yAreaSize);

    if (taken1stRowInArea === taken2ndRowInArea) {
      return this.splitRows(board);
    }

    const taken1stRow = takenAreaRow * yAreaSize + taken1stRowInArea;
    const taken2ndRow = takenAreaRow * yAreaSize + taken2ndRowInArea;
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
    const takenAreaCol = this.nextRandomRange(xAreaCount);
    const taken1stColInArea = this.nextRandomRange(xAreaSize);
    const taken2ndColInArea = this.nextRandomRange(xAreaSize);

    if (taken1stColInArea === taken2ndColInArea) {
      return this.splitCols(board);
    }

    const taken1stCol = takenAreaCol * xAreaSize + taken1stColInArea;
    const taken2ndCol = takenAreaCol * xAreaSize + taken2ndColInArea;

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
    const taken1stAreaRow = this.nextRandomRange(yAreaCount);
    const taken2ndAreaRow = this.nextRandomRange(yAreaCount);

    if (taken1stAreaRow === taken2ndAreaRow) {
      return this.splitRowAreas(board);
    }

    for (let i = 0; i < yAreaSize; i++) {
      const taken1stRow = taken1stAreaRow * yAreaSize + i;
      const row1st = board[taken1stRow];
      const taken2ndRow = taken2ndAreaRow * yAreaSize + i;
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
    const taken1stAreaCol = this.nextRandomRange(xAreaCount);
    const taken2ndAreaCol = this.nextRandomRange(xAreaCount);

    if (taken1stAreaCol === taken2ndAreaCol) {
      return this.splitColAreas(board);
    }

    board.forEach(row => {
      for (let i = 0; i < xAreaSize; i++) {
        const taken1stCell = taken1stAreaCol * xAreaSize + i;
        const cell1st = row[taken1stCell];
        const taken2ndCell = taken2ndAreaCol * xAreaSize + i;
        const cell2nd = row[taken2ndCell];

        row[taken2ndCell] = cell1st;
        row[taken1stCell] = cell2nd;
      }
    });

    return board;
  }

  private nextRandomRange(to: number, from: number = 0): number {
    return Math.floor((this.nextRandom() / this.limit) * to) + from;
  }

  private nextRandom(): number {
    this.seed = this.seed * this.pureNumber % this.limit;
    return this.seed;
  }
}
