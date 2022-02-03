const variable = {
  toastofy: false
};
/* eslint-disable  no-return-assign */

function MagasinEtat(state = variable, action) {
  switch (action.type) {
    case 'toastofile':
      return {
        ...state,
        toastofy: (state.toastofy = true),
      };
    default: return state;
  }
}

export default MagasinEtat;
