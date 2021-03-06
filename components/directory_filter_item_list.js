import { connect } from 'react-redux';
import $           from 'jquery';

import UI_directoryItem              from './ui_directory_item';
import { loadingAllAction }          from '../actions';
import { loadingContentAction }      from '../actions';
import { initPaperAction }           from '../actions';
import { initCommentsAction }        from '../actions';
import { initDirectoryFilterAction } from '../actions';

import common_getDomain from '../modules/common_get_domain';

var mapStateToProps = (state, props) => {
    var directory  = state.appReducer.directoryFilter ? state.appReducer.directoryFilter : [];
    
    return ({
        directory: directory
    });
};

var mapDispatchToProps = (dispatch, props) => {
    const { passState } = props;

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

    var ajaxInitPaper = (currentPaperId) => (dispatch) => {
        const domain     = common_getDomain();
        const requestUrl = domain + '/getPaper.node';
        const jsonData = {
                currentPaperId: currentPaperId
            };

        return (
            $.post(requestUrl, jsonData, function(data) {
                dispatch(initPaperAction(currentPaperId, data));
            })
        );
    };

    var ajaxInitComments = (currentPaperId) => (dispatch) => {
        const domain     = common_getDomain();
        const requestUrl = domain + '/getComments.node';
        const jsonData = {
                paperId: currentPaperId
            };

        return (
            $.post(requestUrl, jsonData, function(data) {
                dispatch(initCommentsAction(data));
            })
        );
    };

    return ({
        passState          : passState,
        loadingAll         : () => dispatch(loadingAllAction()),
        loadingContent     : () => dispatch(loadingContentAction()),
        initDirectoryFilter: (keyword, keywordType) => dispatch(ajaxInitDirectoryFilter(keyword, keywordType)),
        initPaper          : (currentPaperId) => dispatch(ajaxInitPaper(currentPaperId)),
        initComments       : (currentPaperId) => dispatch(ajaxInitComments(currentPaperId))
    });
};

const DirectoryFilterItemList = connect(
        mapStateToProps, 
        mapDispatchToProps
    )(UI_directoryItem);

export default DirectoryFilterItemList;