export interface Question {
    id: string;
    text: string;
    options: string[];        // 4 possible choices
    correct_option: number;   // index of the correct option (0 to 3)
  }
  
  export interface Quiz {
    id: string;
    title: string;
    questions: Question[];    // array of questions for the quiz
  }
  
  export interface Answer {
    question_id: string;
    selected_option: number;
    is_correct: boolean;
  }
  
  export interface Result {
    quiz_id: string;
    user_id: string;
    score: number;            // total correct answers
    answers: Answer[];        // list of answers submitted by the user
  }
  