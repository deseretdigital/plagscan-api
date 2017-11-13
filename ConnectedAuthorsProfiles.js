import AuthorsProfiles from './AuthorsProfiles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../Actions/AuthorsSearchActions';

export default connect(
  ({ authorsSearch, validation }, { identifier }) => {
      const { results, ...rest } = authorsSearch;
      const specificResults = results[identifier];
      return {
          authorsSearch: {
              ...rest,
              results: specificResults,
          },
          validationIsValid: validation.valid[identifier],
      };
  },
  (dispatch) => ({
      actions: bindActionCreators(Actions, dispatch)
  })
)(AuthorsProfiles);
