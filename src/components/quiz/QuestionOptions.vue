<template>
  <div class="qopts" v-if="hasQuestions">
    <div v-if="questions[nextIdx]" class="input-group">
      <div class="mb-3">
        <div class="input-group-prepend quiz-question">
          <span ref="question">{{questions[nextIdx].question}}</span>
        </div>
        <div class="form-check quiz-question-opt">
          <div v-for="(opt) in questions[nextIdx].options" v-bind:key="opt.text">
            <input type="radio" :id="computedId(opt.index)" class="form-check-input" :value="opt.index" v-model="userChoice" @change="applyFilter()" />
            <label class="form-check-label quiz-question-opt-label" for="question" :data-question="opt.text">
              {{opt.text}}
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="traverse-buttons">
      <ul class="pagination pagination-md justify-content-center">
        <li :class="prevButtonStyle()">
          <a class="page-link" href="#" @click="prevQ()" aria-label="Previous">Previous</a>
        </li>
        <li :class="nextButtonStyle()">
          <a class="page-link" href="#" v-if="lblNext === 'Finish'" @click="finish()" :aria-label="lblNext">{{lblNext}}</a>
          <a class="page-link" href="#" v-if="lblNext === 'Next'" @click="nextQ()" :aria-label="lblNext">{{lblNext}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";
import * as _ from "lodash";

export default {
  data: () => {
    return {
      nextIdx: 0,
      questionAndAnswers: [],
      userChoice: "",
      lblNext: "Next"
    };
  },
  computed: {
    hasQuestions() {
      //console.log("1.hasQuestions", this.$store.getters.hasQuestions);
      return this.$store.getters.hasQuestions;
    },
    questions() {
      //console.log("2.questions");
      return this.$store.getters.questions;
    }
  },
  created() {
    this.$store.dispatch("fetchQuestions");
  },
  methods: {
    computedId(id) {
      return `question-${id}`;
    },
    applyFilter() {
      let currQ = this.questions[this.nextIdx];
      //console.log(this.userChoice);
      //console.log(JSON.stringify(currQ));
      let selectedOpt = _.find(currQ.options, { index: this.userChoice });
      //console.log("Selected Frame ", selectedOpt.frame);
      eventBus.photoFilter(selectedOpt.frame, this.nextIdx);
    },
    addToAnswered() {
      this.questionAndAnswers[this.nextIdx] = {
        question: this.questions[this.nextIdx].question,
        userChoice: this.userChoice
      };
    },
    finish() {
      this.addToAnswered();
      var selectedFrames = _.map(this.questionAndAnswers, "frame").join("");
      var userResponse = {
        userResponses: this.questionAndAnswers,
        selectedFrames: selectedFrames
      };
      eventBus.collaborate(userResponse);
    },
    nextQ() {
      if (this.nextIdx < this.questions.length - 1) {
        this.addToAnswered();
        this.nextIdx++;
        if (this.questionAndAnswers[this.nextIdx]) {
          this.userChoice = this.questionAndAnswers[this.nextIdx].userChoice;
        } else {
          this.userChoice = "";
        }
      }
    },
    prevQ() {
      if (this.nextIdx >= 1) {
        this.addToAnswered();
        this.nextIdx--;
        if (this.questionAndAnswers[this.nextIdx]) {
          this.userChoice = this.questionAndAnswers[this.nextIdx].userChoice;
        }
        if (this.lblNext === "Finish") {
          this.lblNext = "Next";
        }
      }
    },
    prevButtonStyle() {
      var style = { "page-item": true };
      if (this.nextIdx >= 1) {
        style["active"] = true;
        return style;
      }
      style["disabled"] = true;
      return style;
    },
    nextButtonStyle() {
      var style = { "page-item": true };
      style["active"] = true;
      if (this.nextIdx === this.questions.length - 1) {
        this.lblNext = "Finish";
        return style;
      }
      return style;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quiz-question-opt {
  padding-left: 30px;
}
.quiz-question-opt-label {
  text-align: center;
}
a.page-link {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
