import type {NextApiRequest, NextApiResponse} from 'next';
import  { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next'
import supabase from '../../lib/server-side/supabase-server';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {email, password} = req.body;
      const {user, session, error} = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      
      setCookies('sb:refresh_token', session?.refresh_token, { req, res, maxAge: 60 * 60 * 24, httpOnly: true});
      setCookies('sb:access_token', session?.access_token, { req, res, httpOnly: true});
    
      res.status(200).send({user});
    } catch (error) {
      res.status(400).send({status: 'fail'});
    }
  }

}
