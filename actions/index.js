import { LOADING, loadingAction }                           from './loading';
import { INIT_DIRECTORY, initDirectoryAction }              from './init_directory';
import { INIT_DIRECTORY_FILTER, initDirectoryFilterAction } from './init_directory_filter';
import { INIT_PAPER, initPaperAction }                      from './init_paper';
import { INIT_TAGS, initTagsAction }                        from './init_tags';
import { INIT_LATEST, initLatestAction }                    from './init_latest';
import { INIT_TIMELINE, initTimelineAction }                from './init_timeline';
import { INIT_COMMENTS, initCommentsAction }                from './init_comments';
import { ADD_PAPER, addPaperAction }                        from './add_paper';

const actionTypes = {
    'LOADING'              : LOADING,
    'INIT_DIRECTORY'       : INIT_DIRECTORY,
    'INIT_DIRECTORY_FILTER': INIT_DIRECTORY_FILTER,
    'INIT_PAPER'           : INIT_PAPER,
    'INIT_TAGS'            : INIT_TAGS,
    'INIT_LATEST'          : INIT_LATEST,
    'INIT_TIMELINE'        : INIT_TIMELINE,
    'INIT_COMMENTS'        : INIT_COMMENTS,
    'ADD_PAPER'            : ADD_PAPER
};

export {
    actionTypes,

    loadingAction,
    initDirectoryAction,
    initDirectoryFilterAction,
    initPaperAction,
    initTagsAction,
    initLatestAction,
    initTimelineAction,
    initCommentsAction,
    addPaperAction
};