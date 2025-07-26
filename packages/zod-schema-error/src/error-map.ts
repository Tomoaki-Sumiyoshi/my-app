import { ErrorType } from './error';
import { ErrorCode } from './error-code';

export const errorMap: Record<ErrorCode, ErrorType> = {
  REQUIRED: {
    code: 'REQUIRED',
    status: 400,
    message: '必須事項です',
  },
  INVALID_TYPE: {
    code: 'INVALID_TYPE',
    status: 400,
    message: '型が正しくありません',
  },
  INVALID_INPUT: {
    code: 'INVALID_INPUT',
    status: 400,
    message: '入力に誤りがあります',
  },
  TOO_LONG: {
    code: 'TOO_LONG',
    status: 400,
    message: '入力が長すぎます',
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    status: 401,
    message: '認証が必要です',
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    status: 403,
    message: 'この操作は許可されていません',
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    status: 404,
    message: '対象のデータが見つかりません',
  },
  CONFLICT: {
    code: 'CONFLICT',
    status: 409,
    message: 'データがすでに存在します',
  },
  DB_ERROR: {
    code: 'DB_ERROR',
    status: 500,
    message: 'データベースエラーが発生しました',
  },
  UNKNOWN: {
    code: 'UNKNOWN',
    status: 500,
    message: '不明なエラーが発生しましたあ',
  },
};
