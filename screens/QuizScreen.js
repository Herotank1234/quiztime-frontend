import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "native-base";
import Answer from "../components/Answer";

import axios from "axios";
import { decode } from "html-entities";

function QuizScreen() {
  const initialQuestions = [{ question: "", answers: [] }];

  const [questions, setQuestions] = useState(initialQuestions);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState([0, 0, 0, 0]);
  const [answerClicked, setAnswerClicked] = useState(false);

  const getMoreQuestions = async (number) => {
    const respData = await axios
      .get("http://quiztime-app-backend.herokuapp.com/moreQuestions", {
        params: {
          number,
        },
      })
      .then((resp) => {
        return resp.data;
      });
    const modifiedQuestions = respData.map((data) => {
      return {
        question: decode(data.question),
        answers: [{ correct: true, value: decode(data.correct_answer) }].concat(
          data.incorrect_answers.map((ans) => {
            return { correct: false, value: decode(ans) };
          })
        ),
      };
    });
    return modifiedQuestions;
  };

  useEffect(() => {
    setLoading(true);
    getMoreQuestions(10).then((res) => {
      setQuestions(res);
    });
    setLoading(false);
  }, []);

  const handleAnswerPress = (key) => {
    if (questions[0].answers[key].correct) {
      highlight[key] = 1;
      setHighlight([...highlight]);
    }
    setTimeout(() => {
      questions.shift();
      if (questions.length <= 3) {
        getMoreQuestions(10).then((res) => {
          setQuestions([...questions].concat(res));
        });
      } else {
        setQuestions([...questions]);
      }
      setHighlight([0, 0, 0, 0]);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        {!loading && (
          <Text style={styles.question}>{questions[0].question}</Text>
        )}
      </View>
      <View style={styles.answerContainer}>
        {!loading &&
          questions[0].answers.map((answer, index) => (
            <Answer
              key={index}
              index={index}
              title={answer.value}
              highlight={highlight}
              onPress={() => handleAnswerPress(index)}
            />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 60,
    width: "100%",
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
  question: {
    fontSize: 25,
    textAlign: "center",
    paddingTop: 30,
  },
  answerContainer: {
    flex: 3,
    justifyContent: "space-around",
    marginVertical: 10,
  },
});

export default QuizScreen;
