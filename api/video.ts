export const config = {
  runtime: 'edge',
};

const VIDEO_URLS: Record<string, string> = {
  '1': 'https://tblfnxaedhmwydjqngnb.supabase.co/storage/v1/object/public/portal-videos/odoo-video-01.mp4',
  '2': 'https://github.com/dubaiincairo/dubaiincairobylovable/releases/download/v-odoo-training-videos/Odoo.s.Video.02.mp4',
  '3': 'https://github.com/dubaiincairo/dubaiincairobylovable/releases/download/v-odoo-training-videos/Odoo.s.Video.03.mp4',
  '4': 'https://github.com/dubaiincairo/dubaiincairobylovable/releases/download/v-odoo-training-videos/Odoo.s.Video.04.mp4',
  '5': 'https://github.com/dubaiincairo/dubaiincairobylovable/releases/download/v-odoo-training-videos/Odoo.s.Video.05.mp4',
  '6': 'https://github.com/dubaiincairo/dubaiincairobylovable/releases/download/v-odoo-training-videos/Odoo.s.Video.06.mp4',
  '7': 'https://github.com/dubaiincairo/dubaiincairobylovable/releases/download/v-odoo-training-videos/Odoo.s.Video.07.mp4',
  '8': 'https://github.com/dubaiincairo/dubaiincairobylovable/releases/download/v-odoo-training-videos/Odoo.s.Video.08.mp4',
  '9': 'https://github.com/dubaiincairo/dubaiincairobylovable/releases/download/v-odoo-training-videos/Odoo.s.Video.09.mp4',
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Range, Content-Type',
      },
    });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get('id') || '1';
  const targetUrl = VIDEO_URLS[id];

  if (!targetUrl) {
    return new Response('Video not found', { status: 404 });
  }

  // Video 1 streams directly from Supabase Storage
  if (id === '1') {
    return Response.redirect(targetUrl, 307);
  }

  const range = req.headers.get('range') || 'bytes=0-';

  try {
    // Manual redirect resolution to prevent fetch from stripping Range header on cross-origin redirect
    const headRes = await fetch(targetUrl, {
      method: 'HEAD',
      redirect: 'manual',
    });

    const location = headRes.headers.get('location');
    const finalUrl = location || targetUrl;

    const upstream = await fetch(finalUrl, {
      method: req.method === 'HEAD' ? 'HEAD' : 'GET',
      headers: {
        range: range,
      },
    });

    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'video/mp4');
    responseHeaders.set('Accept-Ranges', 'bytes');
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges');

    const contentRange = upstream.headers.get('content-range');
    if (contentRange) {
      responseHeaders.set('Content-Range', contentRange);
    }

    const contentLength = upstream.headers.get('content-length');
    if (contentLength) {
      responseHeaders.set('Content-Length', contentLength);
    }

    const etag = upstream.headers.get('etag');
    if (etag) {
      responseHeaders.set('ETag', etag);
    }

    return new Response(req.method === 'HEAD' ? null : upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (error) {
    return new Response('Error streaming video: ' + (error instanceof Error ? error.message : String(error)), {
      status: 502,
    });
  }
}
