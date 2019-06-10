import ArrayService from "../../services/array.service";

export default {
  sortHighscorelist: list => {
    let highscoreList = list.sort(ArrayService.sortObjectByProperty("time"));

    // add differences
    highscoreList.reduce((accu, curr, index, array) => {
      curr.diff_first = curr.time - array[0].time;
      curr.diff_prev = curr.time - accu;

      return curr.time;
    }, highscoreList[0].time);

    return [...highscoreList];
  },

  createId: list => {
    let id = 0;

    list.forEach(item => {
      id = Math.max(id, item.id);
    });

    return id + 1;
  }
};
