import type {NextApiRequest, NextApiResponse} from 'next';
import {getCookie, checkCookies} from 'cookies-next';
import supabase from '../../lib/server-side/supabase-server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const hasRefreshToken = checkCookies('sb:refresh_token', {req, res});
    if (!hasRefreshToken) throw Error;

    const refreshToken = getCookie('sb:refreshToken', {req, res});
    const {user, session, error} = await supabase.auth.signIn({
      refreshToken: refreshToken as string,
    });
  } catch (error) {}
}
