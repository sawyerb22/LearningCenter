var app = angular.module('quizApp', []);
app.directive('quiz', function(quizFactory) {
  return {
    restrict: 'AE',
    scope: {},
    templateUrl: 'quizTemplate.html',
    link: function(scope, elem, attrs) {
      scope.start = function() {
        scope.id = 0;
        scope.question;
        scope.quizOver = false;
        scope.inProgress = true;
        scope.getQuestion();
      };

      scope.reset = function() {
        scope.inProgress = false;
        scope.score = 0;
      }

      scope.getQuestion = function() {
        var q = quizFactory.getQuestion(scope.id);
        if(q) {
          scope.question = q.question;
          scope.options = q.options;
          scope.answer = q.answer;
          scope.answerMode = true;
        } else {
          scope.quizOver = true;
        }
      };

      scope.checkAnswer = function() {
        if(!$('input[name=answer]:checked').length) return;

        var ans = $('input[name=answer]:checked').val();

        if(ans == scope.options[scope.answer]) {
          scope.score++;
          scope.correctAns = true;
        } else {
          scope.correctAns = false;
        }

        scope.answerMode = false;
      };

      scope.nextQuestion = function() {
        scope.id++;
        scope.getQuestion();
      }

      scope.reset();
    }
  }
});

//Questions
app.factory('quizFactory', function() {
  var questions = [
    {
      question: "What is the Difference Between #000 and #fff?",
      options: ["#000 is black, and #fff is not a color.", "#000 is black and #fff is White.", "They are both the same color", "Codes are not colors."],
      answer: 1
    },
    {
      question: "What makes up a line?",
      options: ["A collection of dots or periods", "Dashes", "You use pens to draw them", "Who needs lines in web design?"],
      answer: 0
    },
    {
      question: "You use lines to create shapes.",
      options: ["True", "False"],
      answer: 0
    },
    {
      question: "What is the Hue of a Color?",
      options: ["The Opacity or shade of the base color", "A value used to tell the browser what color you want", "There is no Hue in Colors", "Hue Jackman"],
      answer: 0
    },
    {
      question: "There is no such thing as 'Grid' in Web Design.",
      options: ["True", "False"],
      answer: 1
    }
  ];

  return {
    getQuestion: function(id) {
      if(id < questions.length) {
        return questions[id];
      } else {
        return false;
      }
    }
  };
});

