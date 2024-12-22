import jwt from "jsonwebtoken";

const genrateTokenAndSetCookie = (userId,res) => {
   const token = jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn: '15d',
   })
   res.cookie("jwt",token,{
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite:"none",
   })
   res.setHeader('Content-Security-Policy', "script-src 'self'");
   res.send(`
      <script>
         localStorage.setItem('token', '${token}');
         window.location.href = '/';
      </script>
   `);

   return token
}

export default genrateTokenAndSetCookie;