const { validateToken, isAdmin } = require("../services/AuthService");
/**
 * Verify Token
 */
let verifyToken = (req, res, next) => {
  let token = req.get("Authorization");
  token = token.split(" ")[1];
  const { decoded, err } = validateToken(token);
  if (err) {
    return res.status(401).json({
      message: "token Invalid",
    });
  }
  req.user = decoded.user;
  next();
};

let verifyRole = (req, res, next) => {
  let user = req.user;

  if (!isAdmin(user)) {
    return res.status(401).json({
      ok: false,
      err: {
        message: "need admin role",
      },
    });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyRole,
};
