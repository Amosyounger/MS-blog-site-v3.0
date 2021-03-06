import React  from 'react';
import $      from 'jquery';
import jQuery from 'jquery';

class CommonNotice extends React.Component {
    constructor() {
        super();
        this.toggleNotice = this.toggleNotice.bind(this);
    };

    toggleNotice() {
        /* toggle notice content manually */
        var $toggleBtn = $('#noticeToggleBtn'),
            $icon      = $toggleBtn.find('.fa');

        if ($icon.hasClass('fa-caret-down')) {
            $icon.removeClass('fa-caret-down').addClass('fa-caret-right');
        }
        else {
            $icon.removeClass('fa-caret-right').addClass('fa-caret-down');
        }

        $toggleBtn.closest('dl').find('dd').stop().slideToggle();
    };

    componentDidMount() {
        /* hide notice content in 3 seconds */
        setTimeout(function() {
            var $toggleBtn = $('#noticeToggleBtn'),
                $icon      = $toggleBtn.find('.fa');

            $icon.removeClass('fa-caret-down').addClass('fa-caret-right');
            $toggleBtn.closest('dl').find('dd').stop().slideUp();
        }, 3000);
    };

    render() {
        return (
            <div className = "content-block">
                <dl className = "comm-dl">
                    <dt>
                        Notice
                        <a 
                            id      = "noticeToggleBtn"
                            onClick = { () => this.toggleNotice() }
                        >
                            <i className = "fa fa-caret-down"></i>
                        </a>
                    </dt>
                    <dd>
                        <i className = "fa fa-circle"></i>
                        &nbsp;
                        访问本 Blog ，为避免部分样式失效，请使用内核支持 CSS3 的浏览器， IE 浏览器请使用 IE9+ 版本。
                    </dd>
                    <dd>
                        <i className = "fa fa-circle"></i>
                        &nbsp;
                        本网站仅供交流阅读使用，转载请注明出处，谢谢。
                    </dd>
                    <dd>
                        <i className = "fa fa-circle"></i>
                        &nbsp;
                        关于博文中的代码，这一版本把xmp标签换成了pre标签，尖括号也做了转义，不同浏览器应该不会出现问题了吧。
                    </dd>
                </dl>
            </div>
        );
    };
};

export default CommonNotice;