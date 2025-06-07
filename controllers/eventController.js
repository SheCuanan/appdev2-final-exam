const Event = require('../models/Event');
const sendEmail = require('../config/nodemailer'); 

exports.getAllEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

exports.createEvent = async (req, res) => {
  const { title, location, date, description } = req.body;

  try {
    const event = await Event.create({
      title,
      location,
      date,
      description,
      userId: req.user._id,
    });

  
    await sendEmail({
      to: req.user.email,
      subject: 'Event Created Successfully!',
      template: 'eventCreated', 
      data: {
        name: req.user.name,
        title,
        location,
        date: new Date(date).toDateString(),
      },
    });

    res.status(201).json(event);
  } catch (err) {
    console.error('Error creating event or sending email:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getMyEvents = async (req, res) => {
  const events = await Event.find({ userId: req.user._id });
  res.json(events);
};
