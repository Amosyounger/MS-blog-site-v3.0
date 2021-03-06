import { connect } from 'react-redux';
import $           from 'jquery';

import UI_commonTags                 from './ui_common_tags';
import { loadingAllAction }          from '../actions';
import { loadingContentAction }      from '../actions';
import { initTagsAction }            from '../actions';
import { initDirectoryFilterAction } from '../actions';

import common_getDomain from '../modules/common_get_domain';

var mapStateToProps = (state, props) => {
    var tags = state.appReducer.tags ? state.appReducer.tags : [];
    
    return ({
        tags: tags
    });
};

var mapDispatchToProps = (dispatch, props) => {
    var ajaxInitTags = () => (dispatch) => {
        const domain     = common_getDomain();
        const requestUrl = domain + '/getTags.node';

        return (
            $.post(requestUrl, function(data) {
                dispatch(initTagsAction(data));
            })
        );
    };

    var ajaxInitDirectoryFilter = (keyword, keywordType) => (dispatch) => {
        const domain     = common_getDomain();
        const requestUrl = domain + '/getDirectoryFilter.node';
        const jsonData   = {
                keyword    : keyword,
                keywordType: keywordType
            };

        return (
            $.post(requestUrl, jsonData, function(data) {
                dispatch(initDirectoryFilterAction(data));
            })
        );
    };

    return ({
        loadingAll         : () => dispatch(loadingAllAction()),
        loadingContent     : () => dispatch(loadingContentAction()),
        initTags           : () => dispatch(ajaxInitTags()),
        initDirectoryFilter: (keyword, keywordType) => dispatch(ajaxInitDirectoryFilter(keyword, keywordType))
    });
};

const CommonTags = connect(
        mapStateToProps, 
        mapDispatchToProps
    )(UI_commonTags);

export default CommonTags;