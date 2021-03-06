import React    from 'react';
import { Link } from 'react-router';

class LatestItem extends React.Component {
    constructor() {
        super();
        this.changePaper  = this.changePaper.bind(this);
    };

    changePaper(paperId) {
        const { loadingContent, initPaper, initComments } = this.props;

        loadingContent();
        initPaper(paperId);
        initComments(paperId);
    };

    render() {
        const { latestItem, latestIndex } = this.props;
        const param_title                 = '【' + latestItem.date + '】' + latestItem.title;
        const param_dataNo                = parseInt(latestIndex) + 1 + '.';
        const text_title                  = latestItem.title;
        const itemId                      = latestItem.id;

        return (
            <dd>
                <Link 
                    to      = { '/paper?paperId=' + itemId }
                    title   = { param_title }
                    data-no = { param_dataNo }
                    onClick = { () => this.changePaper(itemId) }
                >
                    { text_title }
                </Link>
            </dd>
        )
    };
};

class UI_commonLatest extends React.Component {
    componentWillMount() {
        const { loadingAll } = this.props;

        loadingAll();
    };

    componentDidMount() {
        const { initLatest } = this.props;

        initLatest();
    };

    render() {
        const { loadingContent, latest, initPaper, initComments } = this.props;

        return (
            <div className = "content-block">
                <dl 
                    id        = "latestList" 
                    className = "comm-dl"
                >
                    <dt>Latest</dt>
                    {
                        latest.map((latestItem, latestIndex) => {
                            return (
                                <LatestItem
                                    key            = { 'latestKey_' + latestIndex }
                                    latestItem     = { latestItem }
                                    latestIndex    = { latestIndex }
                                    loadingContent = { loadingContent }
                                    initPaper      = { initPaper }
                                    initComments   = { initComments }
                                />
                            )
                        })
                    }
                </dl>
            </div>
        );
    };
};

export default UI_commonLatest;