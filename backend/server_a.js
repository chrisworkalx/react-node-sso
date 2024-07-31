// serverA.js

import express from "express";
import session from "express-session";
import passport from "passport";
import OpenIDConnectStrategy from "passport-openidconnect";
import crypto from "crypto";

const secret = crypto.randomBytes(64).toString("hex");

const app = express();

app.use(session({ secret, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OpenIDConnectStrategy(
    {
      issuer: "http://localhost:8080/realms/myrealm",
      authorizationURL:
        "http://localhost:8080/realms/myrealm/protocol/openid-connect/auth",
      tokenURL:
        "http://localhost:8080/realms/myrealm/protocol/openid-connect/token",
      userInfoURL:
        "http://localhost:8080/realms/myrealm/protocol/openid-connect/userinfo",
      clientID: "myclient",
      clientSecret: "dSC9rxQOhh8MYgzOnJ45DUMaoIOaq4pX",
      callbackURL: "http://localhost:3000/auth/callback",
    },
    (issuer, profile, cb) => {
      try {
        // Here you can handle the profile data and access tokens as needed
        return cb(null, profile); // Call done with `null` for error and `user` object
      } catch (error) {
        return cb(error); // Call done with error if something goes wrong
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("---serializeUser------");
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  console.log("-----deserializeUser------");
  done(null, obj);
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

app.get("/login", passport.authenticate("openidconnect"));

app.get(
  "/auth/callback",
  passport.authenticate("openidconnect", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/", isAuthenticated, (req, res) => {
  res.send(`Hello, ${req.user.displayName}`);
});

app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

app.listen(3000, () => {
  console.log("Server A started on http://localhost:3000");
});
