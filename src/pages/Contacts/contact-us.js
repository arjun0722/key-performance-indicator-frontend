// import React from 'react';

// import WhatsAppIcon from '../components/WhatsAppIcon';
// // import { useToast } from '../utils';
// import { db } from '../../firebaseConfig';

// export default function Contact() {

//     const [data, setData] = React.useState({
//         name: "",
//         email: "",
//         subject: "",
//         number: "",
//         message: ""
//     })

//     const { showError, showSuccess } = useToast();

//     function handleChange(e, type) {
//         setData((data) => ({ ...data, [e.target.name]: e.target.value }))
//     }

//     async function handeForm(e) {
//         e.preventDefault()
//         try {

//             db.collection("ContactData").add({ data }).then(resp => {
//                 showSuccess("Submitted Successfully...!!!")
//                 setData({
//                     name: "",
//                     email: "",
//                     subject: "",
//                     number: "",
//                     message: ""
//                 })
//             }).catch(err => {
//                 showError("Some error occured, please try again.")
//             })

//         } catch (error) {
//             showError("Some error occured, please try again.")
//         }
//     }

//     return (
//         <>
//             <Head>
//                 <title>Contact</title>
//                 {/* <meta name='robots' content='noindex, nofollow’' /> */}
//                 <link rel="icon" href="/favicon.ico" />
//                 <title>Contact Us | Jamesons Info Solutions</title>
//                 <meta name="description" content="If you have any questions or need IT support, please contact us with our experts for your business growth." />
//                 <link rel="canonical" href="https://jamesonsinfosolutions.com/contact-us" />
//                 <meta property="og:title" content="Jamesons Info Solutions" />
//                 <meta property="og:description" content="Jamesons Info Solutions is one of the best IT software companies based in Lucknow that helps to grow your business's digital presence dynamically, which enhances marketing objectives." />
//                 <meta property="og:url" content="https://jamesonsinfosolutions.com/contact-us" />
//             </Head>

//             {/* <!-- Contact Start --> */}
//             <div className="contact mt-125">
//                 <div className="container" id="contact-page-container">
//                     <div className="section-header">
//                         {/* <p>Get In Touch</p> */}
//                         <h2>Get In Touch For Any Query</h2>
//                     </div>
//                     <div className="row align-items-center">
//                         <div className="col-md-5">
//                             <div className="contact-info">
//                                 <div className="contact-icon">
//                                     <i className="fa fa-map-marker"></i>
//                                 </div>
//                                 <div className="contact-text">
//                                     <h3>Our Head Office</h3>
//                                     <p>225, 2nd Floor Cyber Heights, Vibhuti Khand Gomti Nagar Lucknow</p>
//                                 </div>
//                             </div>
//                             <div className="contact-info">
//                                 <div className="contact-icon">
//                                     <i className="fa fa-phone"></i>
//                                 </div>
//                                 <div className="contact-text">
//                                     <h3>Contact us On</h3>
//                                     <p>+91 930 562 8315</p>
//                                 </div>
//                             </div>
//                             <div className="contact-info">
//                                 <div className="contact-icon">
//                                     <i className="fa fa-envelope"></i>
//                                 </div>
//                                 <div className="contact-text">
//                                     <h3>Write Us At</h3>
//                                     <p>info@jamesonsinfosolutions.com</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-md-7">
//                             <div className="contact-form">
//                                 <div id="success"></div>
//                                 <form name="sentMessage" id="contactForm" onSubmit={(e) => handeForm(e)}>
//                                     <div className="control-group">
//                                         <input type="text" className="form-control" id="name" onChange={(e) => { handleChange(e) }} name="name" value={data.name} placeholder="Your Name" required={true} min={3} max={20} />
//                                         <p className="help-block text-danger"></p>
//                                     </div>
//                                     <div className="control-group">
//                                         <input type="email" className="form-control" id="email" onChange={(e) => { handleChange(e) }} name="email" value={data.email} placeholder="Your Email" required={true} data-validation-required-message="Please enter your email" />
//                                         <p className="help-block text-danger"></p>
//                                     </div>
//                                     <div className="control-group">
//                                         <input type="text" className="form-control" id="subject" onChange={(e) => { handleChange(e) }} placeholder="Subject" name="subject" value={data.subject} required={true} data-validation-required-message="Please enter a subject" />
//                                         <p className="help-block text-danger"></p>
//                                     </div>
//                                     <div className="control-group">
//                                         <input type="number" className="form-control" id="number" onChange={(e) => { handleChange(e) }} placeholder="Your Contact" name="number" value={data.number} required={true} data-validation-required-message="Please enter your Contact" />
//                                         <p className="help-block text-danger"></p>
//                                     </div>
//                                     <div className="control-group">
//                                         <textarea className="form-control" id="message" placeholder="Message" onChange={(e) => { handleChange(e) }} name="message" value={data.message} required={true} data-validation-required-message="Please enter your message"></textarea>
//                                         <p className="help-block text-danger"></p>
//                                     </div>
//                                     <div>
//                                         <button className="btn" type="submit" id="sendMessageButton">Send Message</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="container-fluid">
//                     <WhatsAppIcon />
//                     <div style={{ display: "flex", justifyContent: "center" }}>
//                         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.0961571719126!2d81.00745871504402!3d26.868685883146554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be295be3524a9%3A0x329fad3755217788!2sLevana%20Cyber%20Heights!5e0!3m2!1sen!2sin!4v1660128342549!5m2!1sen!2sin" width="800" height="600" style={{ border: "0", width: "80vw" }} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
//                     </div>
//                 </div>
//             </div>
//             {/* <!-- Contact End --> */}

//         </>
//     )
// }
