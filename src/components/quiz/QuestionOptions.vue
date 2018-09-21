<template>
  <div>
    <div class="row">
      <div class="col-12" v-if="hasQuestions">
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
      </div>
      <div class="col-8">
        <div class="row  justify-content-end">
          <div class="col col-6">
            <button :class="prevButtonStyle()" @click="prevQ()">Previous</button>
          </div>
          <div class="col col-2">
            <button :class="nextButtonStyle()" v-if="lblNext === 'Finish'" @click="finish()">{{lblNext}}</button>
            <button :class="nextButtonStyle()" v-if="lblNext === 'Next'" @click="nextQ()">{{lblNext}}</button>
          </div>
        </div>
      </div>
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
      this.$store.dispatch("progress", this.nextIdx + 1);
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
      this.$store.dispatch("progress", this.nextIdx + 1);
    },
    prevQ() {
      if (this.nextIdx >= 1) {
        this.$store.dispatch("progress", this.nextIdx);
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
      var style = { btn: true };
      if (this.nextIdx >= 1) {
        style["active"] = true;
        return style;
      }
      style["disabled"] = true;
      return style;
    },
    nextButtonStyle() {
      var style = { btn: true };
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
<style lang="scss" scoped>
.btn {
  text-transform: none;
}
.quiz-question {
  margin-bottom: 10px;
  font-size: 18px;
  line-height: 1.6;
}
.quiz-question-opt label {
  font-size: 15px;
  line-height: 1.6;
  margin-top: 3px;
}
</style>
