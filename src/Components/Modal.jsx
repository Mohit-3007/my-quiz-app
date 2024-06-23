import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ open, close, type }) => {
  if (!open) return null;
  return createPortal(
    <div className="modal w-screen h-screen fixed top-0 left-0 z-50 overflow-hidden">
      <div className="w-52 h-52 bg-red-400">
        Hello
        <button onClick={close}>Click to close {type}</button>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;

// {
//     [
//         {
//             "id": 1,
//             "title": "One",
//             "quizData": [
//                 "One",
//                 {
//                     "ques": "1sdada",
//                     "options": [
//                         "asdad",
//                         "asdasd",
//                         "asds",
//                         "adad"
//                     ],
//                     "answer": "",
//                     "answerIdx": 2,
//                     "points": 1
//                 },
//                 {
//                     "ques": "asdada",
//                     "options": [
//                         "asdasdasdasd",
//                         "asdsad",
//                         "asdasdasdad",
//                         "asdasdasd",
//                         "asdasdasd"
//                     ],
//                     "answer": "",
//                     "answerIdx": 1,
//                     "points": 1
//                 },
//                 {
//                     "ques": "asdadasd",
//                     "options": [
//                         "dsadasd",
//                         "asdasdasd",
//                         "asdasdd",
//                         "asdsadd",
//                         "asdsad"
//                     ],
//                     "answer": "",
//                     "answerIdx": 1,
//                     "points": 1
//                 },
//                 {
//                     "ques": "asddsdsad",
//                     "options": [
//                         "asdasdas",
//                         "asdsad",
//                         "asdasdasd",
//                         "asdsadsa"
//                     ],
//                     "answer": "",
//                     "answerIdx": 2,
//                     "points": 1
//                 }
//             ],
//             "totalPoints": 4
//         },
//         {
//             "id": 2,
//             "title": "Two",
//             "quizData": [
//                 "Two",
//                 {
//                     "ques": "dfgdgdgd",
//                     "options": [
//                         "gdfgdfg",
//                         "gdfgdfgdf",
//                         "gdfgdfgdf",
//                         "gdfgdfgdfgdf"
//                     ],
//                     "answer": "",
//                     "answerIdx": 0,
//                     "points": 1
//                 },
//                 {
//                     "ques": "dfgdgdfg",
//                     "options": [
//                         "gdfgdfg",
//                         "dfgdfgdf",
//                         "dfgdfg",
//                         "dfgdfgdfg"
//                     ],
//                     "answer": "",
//                     "answerIdx": 1,
//                     "points": 4
//                 },
//                 {
//                     "ques": "dfgfgdfgdf",
//                     "options": [
//                         "gdfgdfgdf",
//                         "dfgdfgdf",
//                         "gdfgdfg",
//                         "dfgdfgdfg"
//                     ],
//                     "answer": "",
//                     "answerIdx": 2,
//                     "points": 15
//                 },
//                 {
//                     "ques": "fgdfgdg",
//                     "options": [
//                         "dfgdfgdfg",
//                         "dfgdfgg",
//                         "dfgdfgdfg",
//                         "dfgdfgdfgdfg"
//                     ],
//                     "answer": "",
//                     "answerIdx": 1,
//                     "points": 17
//                 },
//                 {
//                     "ques": "dfgdgdf",
//                     "options": [
//                         "gdfgdfg",
//                         "dfgdfgdf",
//                         "gdfgdfg",
//                         "dfgdfg"
//                     ],
//                     "answer": "",
//                     "answerIdx": 3,
//                     "points": 18
//                 },
//                 {
//                     "ques": "dfgfdgdg",
//                     "options": [
//                         "gdfgfdgdfg",
//                         "dfgdfgdf",
//                         "gdfgdf"
//                     ],
//                     "answer": "",
//                     "answerIdx": 0,
//                     "points": 14
//                 }
//             ],
//             "totalPoints": 69
//         },
//         {
//             "id": 3,
//             "title": "Three",
//             "quizData": [
//                 "Three",
//                 {
//                     "ques": "fghfhfh",
//                     "options": [
//                         "hfghfghfg",
//                         "fghfghfg",
//                         "hfghfghfg"
//                     ],
//                     "answer": "",
//                     "answerIdx": 2,
//                     "points": 14
//                 },
//                 {
//                     "ques": "fghfhfgh",
//                     "options": [
//                         "fghfghfh",
//                         "fghfgh",
//                         "fghfgh",
//                         "fghfghfghfg"
//                     ],
//                     "answer": "",
//                     "answerIdx": 1,
//                     "points": 11
//                 },
//                 {
//                     "ques": "fghfghfgh",
//                     "options": [
//                         "hfghfghfgh",
//                         "fghfgh",
//                         "fghfgh",
//                         "fghgfh"
//                     ],
//                     "answer": "",
//                     "answerIdx": 2,
//                     "points": 4
//                 },
//                 {
//                     "ques": "fghgfhfg",
//                     "options": [
//                         "fghfghfghfg",
//                         "hfghfghfgh",
//                         "fghfghfg",
//                         "hfghfghfgh"
//                     ],
//                     "answer": "",
//                     "answerIdx": 2,
//                     "points": 6
//                 }
//             ],
//             "totalPoints": 35
//         },
//         {
//             "id": 4,
//             "title": "Four",
//             "quizData": [
//                 "Four",
//                 {
//                     "ques": "dfgdfgdgd",
//                     "options": [
//                         "gdfgdfg",
//                         "gdfgdfgdf",
//                         "gdfgdfgd",
//                         "dfgdfgdfg"
//                     ],
//                     "answer": "",
//                     "answerIdx": 3,
//                     "points": 5
//                 },
//                 {
//                     "ques": "dfgdgdfg",
//                     "options": [
//                         "dfgdfgdf",
//                         "gdfgdfg",
//                         "dfgdfg",
//                         "dfgdfgdf"
//                     ],
//                     "answer": "",
//                     "answerIdx": 3,
//                     "points": 4
//                 },
//                 {
//                     "ques": "fghfghfd",
//                     "options": [
//                         "fghfghfgh",
//                         "fghfhgfh",
//                         "fghfghfghfg",
//                         "fghfghfg"
//                     ],
//                     "answer": "",
//                     "answerIdx": 2,
//                     "points": 6
//                 },
//                 {
//                     "ques": "dgdfgdfg",
//                     "options": [
//                         "gdfgdfgdg",
//                         "dfgdfgfg",
//                         "dfgdfgdf",
//                         "gdfgdfgdf"
//                     ],
//                     "answer": "",
//                     "answerIdx": 3,
//                     "points": 11
//                 }
//             ],
//             "totalPoints": 26
//         },
//         {
//             "id": 5,
//             "title": "Five",
//             "quizData": [
//                 "Five",
//                 {
//                     "ques": "vfhgkuj",
//                     "options": [
//                         "fgdfgdf",
//                         "gdfgdfgdfg",
//                         "dfgdfgd",
//                         "fgdfgdfg"
//                     ],
//                     "answer": "",
//                     "answerIdx": 3,
//                     "points": 6
//                 },
//                 {
//                     "ques": "dfgdfgdfg",
//                     "options": [
//                         "dfgdfgdf",
//                         "dfgdfg",
//                         "dfgdfg",
//                         "dfgdfgdfgdfg"
//                     ],
//                     "answer": "",
//                     "answerIdx": 1,
//                     "points": 1
//                 },
//                 {
//                     "ques": "dfgfdgdfg",
//                     "options": [
//                         "dfgdfg",
//                         "gdfgdfg",
//                         "dfgdfgdf",
//                         "gfdgdfgdf"
//                     ],
//                     "answer": "",
//                     "answerIdx": 0,
//                     "points": 7
//                 },
//                 {
//                     "ques": "dfgdfgdfg",
//                     "options": [
//                         "dgdfgdfg",
//                         "dfgdfgf",
//                         "dfgdfgdfgdfg",
//                         "dfgfdg"
//                     ],
//                     "answer": "",
//                     "answerIdx": 3,
//                     "points": 5
//                 },
//                 {
//                     "ques": "dfgfdgdfgdfg",
//                     "options": [
//                         "gdfgfdg",
//                         "dfgdfgdf",
//                         "dfgdfgdfg",
//                         "dfgdfg"
//                     ],
//                     "answer": "",
//                     "answerIdx": 2,
//                     "points": 13
//                 },
//                 {
//                     "ques": "dfgdfgdfgdf",
//                     "options": [
//                         "fdgdfgdf",
//                         "gdfgdfg",
//                         "gdfgdfgdf",
//                         "gdfg",
//                         "dfgdfgdfgdf"
//                     ],
//                     "answer": "",
//                     "answerIdx": 4,
//                     "points": 6
//                 }
//             ],
//             "totalPoints": 38
//         }
//     ]
// }
