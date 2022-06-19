import type {NextApiRequest, NextApiResponse} from 'next';
import supabase from '../../lib/server-side/supabase-server';

type Data = {
  name: string;
};

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const {email, password} = req.body;
  //const { user, session, error } = await supabase.auth.signUp({
    //email,
    //password,
  //})
  const { user, session, error } = await supabase.auth.signIn({
    email,
    password,
  })
  if (error) {
    console.log(error)
  }
  console.log(user)
  console.log(session)


  res.status(200).json({name: 'John Doe'});
}
