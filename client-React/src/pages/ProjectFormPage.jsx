import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchorCircleExclamation, faArrowLeft, faArrows, faArrowsAlt, faArrowsLeftRight, faComments } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { createProjects } from '../api/project.api';
import { useState } from 'react';
import './ProjectFormPage.css';
import { ProjectsList } from "../components/ProjectsList";




export function ProjectFormPage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setErrorMessage('');
        const payload = {
            title: "Default Title",
            technology: "Default Technology",
            description: data.description
        };
        try {
            const res = await createProjects(payload);
            console.log(res);
            reset();
        } catch (error) {
            setErrorMessage('Error al crear el proyecto. Inténtalo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, { text: newComment, replies: [] }]);
            setNewComment('');
        }
    };

    const handleReplyClick = (index) => {
        setReplyingTo(index);
    };

    const handleAddReply = (index) => {
        if (replyText.trim() !== '') {
            const updatedComments = [...comments];
            updatedComments[index].replies.push(replyText);
            setComments(updatedComments);
            setReplyText('');
            setReplyingTo(null);
        }
    };

    return (
        
        <div className="page-container">
          
            <div className="content">
            <h2>Comments as Wonderful-External22</h2>  
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <textarea
                        rows="3"
                        placeholder="Description"
                        {...register("description", { required: true })}
                        className="input textarea"
                    ></textarea>
                    {errors.description && <span className="error">This field is required</span>}
                    
                    {errorMessage && <div className="error">{errorMessage}</div>}
                    
                    <button type="submit" disabled={isSubmitting} className="button">Commnets</button>
                </form>  

                <div className="comments-section">
                    <h3>Comments <FontAwesomeIcon icon={faArrowsLeftRight   } /></h3>
                      <h3>58<FontAwesomeIcon icon={faComments   } /></h3>
                    <ProjectsList/>

                    <div className="comments-list">
                        {comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <p>{comment.text}</p>
                                {comment.replies.map((reply, idx) => (
                                    <div key={idx} className="reply">
                                        <p>{reply}</p>
                                    </div>
                                ))}
                                <button onClick={() => handleReplyClick(index)} className="button-reply">Reply</button>
                                {replyingTo === index && (
                                    <div className="reply-form">
                                        <input
                                            type="text"
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Add a reply"
                                            className="input"
                                        />
                                        <button onClick={() => handleAddReply(index)} className="button-reply">Submit</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="sidebar">
                <div className="community-info">
                    <div className="header">
                        <img src="p5.PNG" alt="Logo" className="logo" />
                        <h2 className="community-title">r/programming</h2>
                    </div>
                    <p className="community-text">Computer Programming</p>
                    <p className="community-text">Created Feb 28, 2006</p>
                    
                    <div className="stats">
                        <p className="members">5.7m Members</p>
                        <p className="online"><span className="green-dot"></span>3.4k Online</p>
                        <p className="rank">Top 1% Ranked by Size</p>
                    </div>
                    <button className="join-button">Join</button>
                </div>
            </div>
        </div>
    );
}
