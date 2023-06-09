import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function CommentForm({t, exists}) {
    const cn = bem('CommentForm');

    const [text, setText] = useState("");

    // exists = true

    return (
        <div className={cn()}>
        {
            exists ? (
                <form className={cn()}>
                    <label htmlFor="comment">
                        {t("comments.newcomment")}
                    </label>
        
                    <textarea value={text} onChange={(e) => setText(e.target.value)} name="comment" id="comment" className={cn("text")}/>
        
                    <button className={cn("send")}>
                        {t("comments.send")}
                    </button>
                </form>
            ) : (
                <div className='log'>
                    <Link to="/login">
                        {t("comments.enter")}
                    </Link>
                    {`, ${t("comments.logdescr")}`}
                </div>
            )
        }
        </div>
    );
}

CommentForm.propTypes = {
    t: PropTypes.func,
    exists: PropTypes.bool
};

CommentForm.defaultProps = {
    t: (t) => t,
};

export default memo(CommentForm);
