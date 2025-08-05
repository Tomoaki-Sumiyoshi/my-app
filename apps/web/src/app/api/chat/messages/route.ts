import { NextRequest, NextResponse } from 'next/server';

import {
  errorMap,
  getSafeMessageBody,
  makeMessageQueryString,
  makeReceiveMultipleApiResponse,
  makeReceiveSingleApiResponse,
  makeSendMultipleApiResponse,
  makeSendSingleApiResponse,
  messageQuerySchema,
} from '@portfolio-chat/zod-schema';

const API_URL = `${process.env.API_URL || 'http://localhost:3001/'}messages`;

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const query = {
    beforeAt: params.get('beforeAt') ?? undefined,
    afterAt: params.get('afterAt') ?? undefined,
    limit: params.get('limit') ?? undefined,
  };
  const safeQuery = messageQuerySchema.safeParse(query);
  if (!safeQuery.success) {
    const error = errorMap.INVALID_TYPE;

    return NextResponse.json(
      { success: false, error },
      { status: error.status }
    );
  }

  const queryString = makeMessageQueryString(safeQuery.data);
  const url = `${API_URL}?${queryString}`;

  const res = await fetch(url);
  const result = makeReceiveMultipleApiResponse(await res.json());
  if (result.success) {
    return NextResponse.json(makeSendMultipleApiResponse(result.data), {
      status: 200,
    });
  }

  return NextResponse.json(result, { status: result.error.status });
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const safeBody = getSafeMessageBody(body);

  if (!safeBody.success) {
    return NextResponse.json(safeBody.error, { status: safeBody.error.status });
  }
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(safeBody.data),
  });

  const result = makeReceiveSingleApiResponse(await res.json());
  if (result.success) {
    return NextResponse.json(makeSendSingleApiResponse(result.data), {
      status: 200,
    });
  }

  return NextResponse.json(result, { status: result.error.status });
};
