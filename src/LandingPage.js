import React, { useState } from "react";
import {
  Button,
  Container,
  Link,
  Typography,
  TextField,
  InputAdornment,
  Box,
  List, ListItem, ListItemText, ListItemAvatar, Avatar, Grid,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import ExtensionIcon from '@mui/icons-material/Extension';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TaskDoneIcon from '@material-ui/icons/AssignmentTurnedIn';
//import TaskArrangedIcon from '@mui/icons-material/CalendarToday';
import TaskScheduledIcon from '@mui/icons-material/EventNote';
import TaskArrangedIcon from '@material-ui/icons/PlaylistAddCheck';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AttachmentIcon from '@mui/icons-material/Attachment';
import TaskCreationIcon from '@mui/icons-material/PostAdd';
import TaskUpdateIcon from '@mui/icons-material/Edit';
import TaskDeletionIcon from '@mui/icons-material/Delete';
import TaskDueDatesIcon from '@mui/icons-material/EventNote';
import TaskAssignmentsIcon from '@mui/icons-material/AssignmentInd';
import TaskPrioritizationIcon from '@mui/icons-material/FilterList';
import TaskProgressTrackingIcon from '@mui/icons-material/CheckCircle';
import TaskNotesAttachmentsIcon from '@mui/icons-material/NoteAdd';
import TaskRemindersIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close';
import TaskManagerImage from './images/WelcomeImage.jpg';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import './styles/LandingPage.css';

const LandingPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleSignupClick = () => {
    setShowSignupForm(true);
  };

  const handleCloseForm = () => {
    setShowLoginForm(false);
    setShowSignupForm(false);
  };
  
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Name:", name);
    console.log("Email:", email);
    // Reset the form fields
    setName("");
    setEmail("");
  };

  return (
    <div className="body-wrap boxed-container">
    <header className="site-header">
  <Container>
    <div className="site-header-inner">
      <div className="brand header-brand">
        <h1 className="m-0">TaskifyPro</h1>
      </div>
      <nav className="header-nav">
        <ul className="header-links list-reset m-0">
          <li>
            <Link href="#home">
              <HomeIcon />
              Home
            </Link>
          </li>
          <li>
            <Link href="#services">
              <WorkIcon />
              Services
            </Link>
          </li>
          <li>
            <Link href="#features">
              <ExtensionIcon />
              Features
            </Link>
          </li>
          <li>
            <Link href="#about">
              <InfoIcon />
              About
            </Link>
          </li>
          <li>
            <Link href="#contact">
              <ContactMailIcon />
              Contact
            </Link>
          </li>
        </ul>
      </nav>
            <div className="header-actions">
        <div className="header-action-buttons">
          <Button variant="outlined" size="small" onClick={handleLoginClick}>
            Login
          </Button>
          <Button variant="contained" size="small" onClick={handleSignupClick}>
            Signup
          </Button>
        </div>
      </div>
    </div>
  </Container>
</header>

      <main>
      <section id="home" className="hero text-light text-center">
  <Container>
    <div className="hero-inner">
      <Typography variant="h2" component="h1" className="hero-title h2-mobile mt-0 is-revealing">
        Welcome to TaskifyPro - Your Ultimate Task Manager
      </Typography>
      <Typography variant="body1" className="hero-paragraph is-revealing">
        <Box sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 500, marginBottom: '2rem' }}>
          Experience the Power of Effective Task Management
        </Box>
        <Box sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, marginBottom: '4rem', lineHeight: '1.5' }}>
          Stay organized, boost productivity, and achieve your goals effortlessly with TaskifyPro. Streamline your tasks, set deadlines, and track your progress seamlessly.
        </Box>
      </Typography>
      <div className="hero-cta is-revealing">
        <Button variant="contained" size="large">
          Get Started Now
        </Button>
      </div>
      <div className="hero-media">
        <img src={TaskManagerImage} alt="Task Manager" className="task-manager-image" />
        <div className="hero-media-icons">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={4} sm={4} md={2}>
              <div className="media-icon">
                <TaskDoneIcon fontSize="large" />
                <Typography variant="body2" className="media-icon-text">Tasks Completed</Typography>
              </div>
            </Grid>
            <Grid item xs={4} sm={4} md={2}>
              <div className="media-icon">
                <TaskArrangedIcon fontSize="large" />
                <Typography variant="body2" className="media-icon-text">Tasks Organized</Typography>
              </div>
            </Grid>
            <Grid item xs={4} sm={4} md={2}>
              <div className="media-icon">
                <TaskScheduledIcon fontSize="large" />
                <Typography variant="body2" className="media-icon-text">Tasks Scheduled</Typography>
              </div>
            </Grid>
            {/* Add more Grid items for additional icons */}
          </Grid>
        </div>
      </div>
    </div>
  </Container>
</section>

<section id="features" className="features">
  <Container>
    <div className="feature-inner">
      <div className="feature-item feature-item-1">
        <Typography variant="h3">Task Reminders</Typography>
        <NotificationsIcon fontSize="large" />
        <Typography variant="body1">Receive reminders for upcoming or overdue tasks to stay on track with your schedule.</Typography>
        <Box component="div">
          <img src="../images/best-price.png" alt="Task Reminders" />
        </Box>
      </div>
      <div className="feature-item feature-item-2">
        <Typography variant="h3">Task Collaboration</Typography>
        <GroupIcon fontSize="large" />
        <Typography variant="body1">Collaborate with team members by assigning tasks, sharing comments, and tracking progress together.</Typography>
        <Box component="div">
          <img src="../images/label.jpg" alt="Task Collaboration" />
        </Box>
      </div>
      <div className="feature-item feature-item-3">
        <Typography variant="h3">Task Analytics</Typography>
        <TrendingUpIcon fontSize="large" />
        <Typography variant="body1">Gain insights into your task performance and productivity with detailed analytics and reports.</Typography>
        <Box component="div">
          <img src="./images/collaboration.jpg" alt="Task Analytics" />
        </Box>
      </div>
      <div className="feature-item feature-item-4">
        <Typography variant="h3">Task Labels and Tags</Typography>
        <LocalOfferIcon fontSize="large" />
        <Typography variant="body1">Organize tasks effectively by assigning labels or tags, making it easy to filter and find specific tasks.</Typography>
        <Box component="div">
          <img src="./images/label.jpg" alt="Task Labels and Tags" />
        </Box>
      </div>
      <div className="feature-item feature-item-5">
        <Typography variant="h3">Task Prioritization</Typography>
        <PriorityHighIcon fontSize="large" />
        <Typography variant="body1">Set task priorities to focus on important tasks and manage your workload efficiently.</Typography>
        <Box component="div">
          <img src="./images/label.jpg" alt="Task Prioritization" />
        </Box>
      </div>
      <div className="feature-item feature-item-6">
        <Typography variant="h3">Task Attachments</Typography>
        <AttachmentIcon fontSize="large" />
        <Typography variant="body1">Attach files, documents, or relevant resources to tasks for easy access and reference.</Typography>
        <Box component="div">
          <img src="./images/label.jpg" alt="Task Attachments" />
        </Box>
      </div>
    </div>
  </Container>
</section>

    <section id="services" className="services">
      <Container>
        <div className="service-inner">
          <div className="service-item">
            <TaskCreationIcon fontSize="large" />
            <Typography variant="h5">Task Creation</Typography>
            <Typography variant="body1">Create and add new tasks to your task list.</Typography>
          </div>
          <div className="service-item">
            <TaskUpdateIcon fontSize="large" />
            <Typography variant="h5">Task Update</Typography>
            <Typography variant="body1">Edit and update existing tasks with new information or changes.</Typography>
          </div>
          <div className="service-item">
            <TaskDeletionIcon fontSize="large" />
            <Typography variant="h5">Task Deletion</Typography>
            <Typography variant="body1">Delete unnecessary or completed tasks from your task list.</Typography>
          </div>
          <div className="service-item">
            <TaskDueDatesIcon fontSize="large" />
            <Typography variant="h5">Task Due Dates</Typography>
            <Typography variant="body1">Add due dates to tasks and receive reminders for upcoming deadlines.</Typography>
          </div>
          <div className="service-item">
            <TaskAssignmentsIcon fontSize="large" />
            <Typography variant="h5">Task Assignments</Typography>
            <Typography variant="body1">Assign tasks to team members and track their progress.</Typography>
          </div>
          <div className="service-item">
            <TaskPrioritizationIcon fontSize="large" />
            <Typography variant="h5">Task Prioritization</Typography>
            <Typography variant="body1">Set task priorities to manage your workload effectively.</Typography>
          </div>
          <div className="service-item">
            <TaskProgressTrackingIcon fontSize="large" />
            <Typography variant="h5">Task Progress Tracking</Typography>
            <Typography variant="body1">Monitor the progress of your tasks and mark them as complete.</Typography>
          </div>
          <div className="service-item">
            <TaskNotesAttachmentsIcon fontSize="large" />
            <Typography variant="h5">Task Notes and Attachments</Typography>
            <Typography variant="body1">Add detailed notes and attachments to tasks for additional information.</Typography>
          </div>
          <div className="service-item">
            <TaskRemindersIcon fontSize="large" />
            <Typography variant="h5">Task Reminders</Typography>
            <Typography variant="body1">Receive reminders for upcoming or overdue tasks.</Typography>
          </div>
        </div>
      </Container>
        </section>
        
        <section id="about" className="about">
  <Container>
    <div className="about-inner">
      <div className="about-content">
        <h2>About TaskifyPro</h2>
        <p>
          TaskifyPro is a leading task management platform that empowers individuals and teams to stay organized, increase productivity, and achieve their goals efficiently. With TaskifyPro, you can streamline your tasks, collaborate seamlessly with your team, set reminders, track progress, and take control of your work.
        </p>
        <p>
          Our mission is to simplify task management and revolutionize the way people approach their daily tasks and projects. We believe that effective task management is the key to success, and our platform is designed to provide you with the tools and features you need to excel.
        </p>
        <p>
          TaskifyPro offers a user-friendly interface, intuitive features, and seamless integration across devices and platforms. Whether you're an individual professional, a small team, or a large organization, TaskifyPro adapts to your needs and helps you accomplish more with less effort.
        </p>
        <p>
          Join TaskifyPro today and experience the power of efficient task management. Take control of your tasks, stay organized, and unlock your full potential.
        </p>
        <div className="about-actions">
          <Button variant="contained" startIcon={<InfoIcon />} className="about-button">Learn More</Button>
          <Button variant="outlined" startIcon={<PersonIcon />} className="about-button">Sign Up</Button>
          <Button variant="outlined" startIcon={<GroupIcon />} className="about-button">Invite Your Team</Button>
        </div>
      </div>
    </div>
  </Container>
</section>

   <section id="contact" className="contact">
      <Container>
        <div className="contact-inner">
          <div className="contact-content">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <Box mt={2} mb={2}>
                <TextField
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={name}
                  onChange={handleNameChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box mt={2} mb={2}>
                <TextField
                  label="Your Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={email}
                  onChange={handleEmailChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box mt={2} mb={2}>
                <Button variant="contained" size="small" type="submit">
                  Sign Up
                </Button>
                <Button variant="contained" size="small" sx={{ ml: 1 }}>
                  Login
                </Button>
              </Box>
            </form>
          </div>
        </div>
      </Container>
    </section>
        
<Typography variant="body1" className="about-description">
  Team Members:
</Typography>
<List className="team-members">
  <ListItem>
    <ListItemAvatar>
      <Avatar alt="Member 1 Avatar" src="member1-avatar.jpg" />
    </ListItemAvatar>
    <ListItemText
      primary="Nicanor Kyamba"
      secondary={
        <Box className="member-links">
          <Link href="https://www.linkedin.com/in/member1" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </Link>
          <Link href="https://github.com/NICANORKYAMBA/task-manager" target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
          </Link>
          <Link href="https://twitter.com/member1" target="_blank" rel="noopener noreferrer">
            <TwitterIcon />
          </Link>
        </Box>
      }
    />
  </ListItem>
</List>
<Typography variant="body1" className="about-description">
  <Link href="https://github.com/NICANORKYAMBA/task-manager" target="_blank" rel="noopener noreferrer">
    GitHub Repository
  </Link>
</Typography>
        </main>

      <footer className="site-footer">
        <Container>
          <div className="site-footer-inner">
            <div className="footer-social-links">
              <Link href="facebook">
                <span className="screen-reader-text">Facebook</span>
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z"
                    fill="#0EB3CE"
                  />
                </svg>
              </Link>
              <Link href="twitter">
                <span className="screen-reader-text">Twitter</span>
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z"
                    fill="#0EB3CE"
                  />
                </svg>
              </Link>
              <Link href="google">
                <span className="screen-reader-text">Google</span>
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z"
                    fill="#0EB3CE"
                  />
                </svg>
              </Link>
            </div>
            <Typography variant="body2" className="footer-copyright">
              &copy; 2023 ALX Portfolio Project, all rights reserved
            </Typography>
          </div>
        </Container>
      </footer>
      
            {showLoginForm && (
        <div className="login-form-overlay">
          <div className="login-form">
            <LoginForm />
            <Button variant="text" className="close-button" onClick={handleCloseForm}>
              <CloseIcon />
              Close
            </Button>
          </div>
        </div>
      )}

      {showSignupForm && (
        <div className="signup-form-overlay">
          <div className="signup-form">
            <SignupForm />
            <Button variant="text" className="close-button" onClick={handleCloseForm}>
              <CloseIcon />
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
