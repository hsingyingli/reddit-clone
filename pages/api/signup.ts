import type { NextApiRequest, NextApiResponse } from "next";
import supabase from '../../lib/server-side/supabase-server';

const signUp = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method ==='POST') {
    const {email, password} = req.body;
    const {error} = await supabase.auth.signUp({
      email, 
      password
    })
    if (error) throw error;

    res.status(200).json({status: 'success'})
  }

  res.status(400).json({status: 'fail'})
}

export default signUp
