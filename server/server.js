const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const session = require("express-session");
const passport = require("passport");

const OAuth2Strategy = require("passport-google-oauth2").Strategy;
// const bodyParser = require('body-parser');

// mongoose.connect('mongodb://127.0.0.1:27017/test');
// const cors = require('cors');
const connectDb = require('./config/db');


const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");


dotenv.config();

//database connect
connectDb();


//middleware
// app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// app.use(bodyParser.json());
const clientid = "943026758338-cu450uas49bbnrvepljsgosp33lnf0kh.apps.googleusercontent.com"
const clientsecret = "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"
//routes
app.use(session({
    secret: "YOUR SECRET KEY",
    resave: false,
    saveUninitialized: true
}))

var GoogleStrategy = require('passport-google-oauth2').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID: clientid,
        clientSecret: clientsecret,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);
                return done("hoa gaya");
                // let user = await userdb.findOne({ googleId: profile.id });

                // if (!user) {
                //     user = new userdb({
                //         googleId: profile.id,
                //         displayName: profile.displayName,
                //         email: profile.emails[0].value,
                //         image: profile.photos[0].value
                //     });

                //     await user.save();
                // }

                // return done(null, user)
            } catch (error) {
                return done(error, null)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
});

// initial google ouath login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3001/dashboard",
    failureRedirect: "http://localhost:3001/login"
}))
app.use(cors({
    origin: "http://localhost:5000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json());


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/category', categoryRouter);
app.use("/api/v1/product", productRoutes);


app.get('/', (req, res) => {
    res.send({ message: `Welcome to e-commerce` });
})
// app.use('/products')


//morgan tell which api url is hit
//Port
const Port = process.env.PORT;

//listen
app.listen(Port, (req, res) => {

    console.log('listening on port' + Port)
})