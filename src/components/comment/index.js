import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Comment({t}) {
    const cn = bem('Comment');

    return (
        <div className={cn()}>
            <div className={cn('head')}>
                <h3 className={cn('name')}>User №1</h3>
                <div className={cn('date')}>25 августа 2022 в 14:00</div>
            </div>

            <div className={cn("text")}>
            Текст комментрия о том какой товар. Комментатор может оставить большой комментрий и он весь показывается. Текст комментрия о том какой товар. Комментатор может оставить большой комментрий и он весь показывается. Текст комментрия о том какой товар. Комментатор может оставить большой комментрий и он весь показывается. 
            </div>

            <button className={cn("respond")}>
                {t("comments.respond")}
            </button>
        </div>
    );
}

Comment.propTypes = {
    t: PropTypes.func,
};

Comment.defaultProps = {
    t: (t) => t,
};

export default memo(Comment);
