const passportConf = require('./passport');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var baseUrl = "/api";
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var statusEvaluationsRouter = require('./routes/statusEvaluations');
var surveyCatsRouter = require('./routes/surveyCats');
var surveyQuestRouter = require('./routes/surveysQuest');
var categoriesRouter = require('./routes/categories');
var domainsRouter = require('./routes/domains');
var dimensionsRouter = require('./routes/dimensions');
var questionsRouter = require('./routes/questions');
var questionTypeRouter = require('./routes/questionType');
var questionGroupRouter = require('./routes/questionGroup');
var employeeEvaluationsRouter = require('./routes/employeeEvaluations');
var answerEmployeeRouter = require('./routes/answerEmployee');
var companiesRouter = require('./routes/companies');
var civilStatusesRouter = require('./routes/civilStatuses');
var contractTypesRouter = require('./routes/contractTypes');
var gendersRouter = require('./routes/genders');
var positionTypesRouter = require('./routes/positionTypes');
var staffTypesRouter = require('./routes/staffTypes');
var studyLevelsRouter = require('./routes/studyLevels');
var workingDayTypesRouter = require('./routes/workingDayTypes');
var employeesRouter = require('./routes/employees');
var actionsRouter = require('./routes/actions');
var rolesRouter = require('./routes/roles');
var evaluationsRouter = require('./routes/evaluations');
var surveyTypesRouter = require('./routes/surveyTypes');
var conditionalsRouter = require('./routes/conditionals');
var answerTypesRouter = require('./routes/answerTypes');
var surveySectionsRouter = require('./routes/surveySections');


var cors = require('cors');
var app = express();

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(`${baseUrl}/surveyCats`, surveyCatsRouter);
app.use(`${baseUrl}/surveyQuest`, surveyQuestRouter);
app.use(`${baseUrl}/categories`, categoriesRouter);
app.use(`${baseUrl}/domains`, domainsRouter);
app.use(`${baseUrl}/dimensions`, dimensionsRouter);
app.use(`${baseUrl}/questions`, questionsRouter);
app.use(`${baseUrl}/questionType`, questionTypeRouter);
app.use(`${baseUrl}/questionGroup`, questionGroupRouter);
app.use(`${baseUrl}/employeeEvaluations`, employeeEvaluationsRouter);
app.use(`${baseUrl}/answerEmployee`, answerEmployeeRouter);
app.use(`${baseUrl}/statusEvaluations`, statusEvaluationsRouter);
app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/actions`, actionsRouter);
app.use(`${baseUrl}/users`, usersRouter);
app.use(`${baseUrl}/companies`, companiesRouter);
app.use(`${baseUrl}/civilStatuses`, civilStatusesRouter);
app.use(`${baseUrl}/contractTypes`, contractTypesRouter);
app.use(`${baseUrl}/genders`, gendersRouter);
app.use(`${baseUrl}/positionTypes`, positionTypesRouter);
app.use(`${baseUrl}/staffTypes`, staffTypesRouter);
app.use(`${baseUrl}/studyLevels`, studyLevelsRouter);
app.use(`${baseUrl}/workingDayTypes`, workingDayTypesRouter);
app.use(`${baseUrl}/employees`, employeesRouter);
app.use(`${baseUrl}/roles`, rolesRouter);
app.use(`${baseUrl}/evaluations`, evaluationsRouter);
app.use(`${baseUrl}/surveyTypes`, surveyTypesRouter);
app.use(`${baseUrl}/conditionals`, conditionalsRouter);
app.use(`${baseUrl}/answerTypes`, answerTypesRouter);
app.use(`${baseUrl}/surveySections`, surveySectionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
