import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const cspReport = await request.json();

    // 로깅 (Vercel Analytics나 외부 로깅 서비스 연동 권장)
    console.error('🚨 CSP Violation Detected:', {
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      report: cspReport
    });

    // 심각한 위반만 알림 (선택적)
    const blockedUri = cspReport['csp-report']?.['blocked-uri'];
    const violatedDirective = cspReport['csp-report']?.['violated-directive'];

    if (blockedUri?.includes('eval') || violatedDirective?.includes('script-src')) {
      // eval 사용 또는 스크립트 위반 감지 - 더 엄격한 모니터링 필요
      console.error('🔴 Critical CSP Violation:', {
        blockedUri,
        violatedDirective,
        documentUri: cspReport['csp-report']?.['document-uri']
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('CSP Report Error:', error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
