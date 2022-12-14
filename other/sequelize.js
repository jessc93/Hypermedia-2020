const Sequelize = require('sequelize');
const config = require('../config/index');
const ArtisticModel = require('./models/artistic');
const CategoryModel = require('./models/category');
const PerformerModel = require('./models/performer');
const UserModel = require('./models/user');
const SeminarModel = require('./models/seminar');
const AuthModel = require('./models/auth');

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    host: config.db_host,
    dialect: config.db_dialect,
    logging: false,
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const Artistic = ArtisticModel(sequelize, Sequelize);
const Auth = AuthModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);
const Performer = PerformerModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Seminar = SeminarModel(sequelize, Sequelize);

const ArtisticPerformer = sequelize.define(
  'artisticPerformer',
  {},
  { timestamps: false },
);
Artistic.belongsToMany(Performer, { through: ArtisticPerformer });
Performer.belongsToMany(Artistic, { through: ArtisticPerformer });
ArtisticPerformer.belongsTo(Performer);
ArtisticPerformer.belongsTo(Artistic);

const Cart = sequelize.define(
  'cart',
  {
    count: Sequelize.INTEGER,
  },
  { timestamp: false },
);
User.belongsToMany(Artistic, { through: Cart });
Artistic.belongsToMany(User, { through: Cart });

Seminar.hasMany(Artistic);
Artistic.belongsTo(Seminar);

sequelize
  .sync({
    force: true,
  })
  .then(() => {
    console.log(`Database and tables created!`);
    initializeDatabase();
  });

/* Export the created models */
module.exports = {
  User,
  Artistic,
  Cart,
  Auth,
  Category,
  Performer,
  Seminar,
  ArtisticPerformer,
};

async function initializeDatabase() {
  await User.create({
    name: 'Jessica',
    email: 'prova@prova.com',
    password:
      'fb7e0d7b6792cdd30a0d464f4137ffba41dfb09f02e66b4f5248badeb64c437a',
  });

  // Performers
  await Performer.create({
    name: 'Clara Iannotta',
    image: './assets/images/performers/CLARA_IANOTTA_1.jpg',
    affiliation: 'Solo composer',
    achievement: '"Al di là del bianco (2009)" for bass clarinet and string trio, written for the ensemble Multilatérale',
    details: 'Born in Rome in 1983, Clara Iannotta has studied at the Conservatories of Milan and Paris, at IRCAM, and at Harvard University with Alessandro Solbiati, Frédéric Durieux, and Chaya Czernowin. Recent commissions include works written for Arditti, Trio Catch, Quatuor Diotima, Ensemble Intercontemporain, Ensemble 2e2m, JACK, Klangforum Wien, Neue Vocalsolisten Stuttgart, Münchener Kammerorchester, Nikel, WDR Orchestra, among others. Iannotta has been a resident fellow of the Berliner Künstlerprogramm des DAAD in 2013, Villa Médicis (Académie de France à Rome) in 2018–19, and the recipient of several prizes including the Ernst von Siemens Composers’ Prize and Hindemith-Preis 2018, Una Vita nella Musica — Giovani 2019, Berlin Rheinsberger Kompositionspreis, Kompositionspreis der Landeshauptstadt Stuttgart, Bestenliste 2/2016 der deutschen Schallplattenkritik for her first portrait CD A Failed Entertainment. Since 2014, Iannotta has been the artistic director of the Bludenzer Tage zeitgemäßer Musik. Her music is published by Edition Peters. She lives and works in Berlin.',
    isGroup: false,
    members: null,
  });

  await Performer.create({
    name: 'Needcompany',
    image: './assets/images/performers/NEEDCOMPANY_1.jpg',
    affiliation: null,
    achievement: null,
    details: 'Needcompany is an artists’ company set up by the artists Jan Lauwers and Grace Ellen Barkey in 1986. Maarten Seghers has been a member of Needcompany since 2001. Lauwers, Barkey and Seghers form the core of the company, and it embraces all their artistic work: theatre, dance, performance, visual art, writing, etc. Their creations are shown at the most prominent venues at home and abroad. Since the very beginning, Needcompany has presented itself as an international, multilingual, innovative and multidisciplinary company. This diversity is reflected best in the ensemble itself, in which on average 7 different nationalities are represented. Over the years Needcompany has put increasing emphasis on this ensemble and several artistic alliances have flourished: Lemm&Barkey (Grace Ellen Barkey and Lot Lemm) and OHNO COOPERATION (Maarten Seghers and Jan Lauwers). Needcompany revolves around the individual artist. Everything is founded on the artistic project, on authenticity, necessity and meaning. The medium itself is continually questioned, and there is constant examination of the quality of the content to be conveyed in relation to the form it takes. Needcompany believes in quality, cooperation and innovation. Needcompany is a leading voice in the social debate on the urgency and beauty of art at both a domestic and an international level.',
    isGroup: true,
    members: 'Jan Lauwers, Grace Ellen Barkey, Maarten Seghers',
  });


  await Performer.create({
    name: 'Franz Hautzinger',
    image: './assets/images/performers/FRANZ_HAUTZINGER_1.jpg',
    affiliation: null,
    achievement: null,
    details: 'Born on March 11, 1963 in Seewinkel, Burgenland, a Hannibal Marvin Peterson concert at Jazzgalerie Nickelsdorf was the young trumpeter’s “awakening experience”. He studied at the Jazz department of today’s Art University in Graz from 1981 to 1983 until lip palsy forced him to take a six year total break from trumpeting. After moving to Vienna in 1986 he started in 1989 to explore the trumpet in his very own and un-academic way. He became attached to the circles around Christoph Cech and Christian Mühlbacher, played in the Big Band “Nouvelle Cuisine” and the octet “Striped Roses”; the CD “Zong of se Boboolink”, which he recorded with saxophonist Helge Hinteregger and which was influenced by sampler collages was the first personal CD statement. His 10 month stay in London provided new ideas and contacts, amongst others Kenny Wheeler, Henry Lowther, John Russel, and Steve Noble. Hautzinger assimilated the stimuli in very different ways: in „Regenorchester“ („Rain Orchestra“) with its changing instrumentation, in the quartet with Helge Hinteregger, Oren Marshall and Steve Noble as well as in the trio “Speakers’ Corner” with guitarist Martin Siewert and drummer Wolfgang Reisinger. The conscious decision to avoid electronic sound sources but to still comprehend the development of digital music on the trumpet – the quarter tone trumpet purchased in 1997 – were decisive stages for the creation of Franz Hautzinger’s sensational solo trumpet CD “Gomberg” (2000) on which he presented this new until then unheard cosmos of sound that he had developed on his instrument. Hautzinger positioned himself with “Gomberg” at the front line of the international improvisation avant-garde; collaborations and CD records with Derek Bailey, the “AMM” veterans Keith Rowe and John Tilbury as well as Axel Dörner, Christian Fennesz or Otomo Yoshihide, and Sachiko M followed. The step into the world of decelerated sound microscopy and from 2003 on the re-discovery of musical sensualism, the confrontation of his trumpet sounds with groove and tunes (“Regenorchester XI” and XII) can be considered as important stages in his development. Franz Hautzinger teaches at the Vienna Music University since 1989, is a member of the Berliner Ensemble “Zeitkratzer” since 1999 and received comissions from Klangforum Vienna amongst others. He is a globetrotter whose unmistakeable musical signature is known from Vienna to Berlin, London to Beirut, or in Tokyo, New York, and Chicago. Franz Hautzinger has shown that even in times where postmodernism is history an instrument can still be reinvented. ',
    isGroup: false,
    members: null,
  });

  await Performer.create({
    name: 'Speak Percussion',
    image: './assets/images/performers/SPEAK_PERCUSSION_1.jpg',
    affiliation: null,
    achievement: null,
    details: 'Speak Percussion has shaped the sound of 21st century Australian percussion music through the creation and presentation of ambitious arts projects. Internationally recognised as a leader in the fields of experimental and contemporary classical music, Speak are constantly seeking to redefine the potential of percussion. Ranging from solo concerts to massed sound events, Speak Percussion’s “breathtakingly impressive” (The West Australian) work is presented throughout the world in concert halls, theatres, galleries and site - specific locations. Speak Percussion have been responsible for over 130 commissions and premieres of new percussion works, Speak Percussion has contributed new 21st Century masterworks to the global percussion repertoire.',
    isGroup: true,
    members: 'Eugene Ughetti, Sheah Sutton, Kaylie Melville, Tilman Robincons, Elizaveta Maltseva',
  });

  await Performer.create({
    name: 'Studio Dan',
    image: './assets/images/performers/STUDIO_DAN_1.jpg',
    affiliation: null,
    achievement: null,
    details: "Studio Dan Art Project is a studio specialized in Creative Productions, Conceptions and Development in multiple sectors as Architecture, Interior Design and Toys Design. Founded in 1999 by Rodolfo De Bernardi(Architect – Polytechnic University of Milan) e Fabio Dal Molin(Art Master – Academy of fine arts of Brera, Milan). Studio Dan Art Project mixes architecture techniques and 3D realization in order to provide a high quality of Rendering service from photorealistic displaying, to preparation of files for prototyping or creation of video projects. In Toys Design, Studio Dan Art Project provides a whole creative service for production companies but also for publishers with the realization of products for the entertainment sector, collectable and flow pack and even the creation of a new brand or the development of a project based on existing licenses. Studio Dan Art Project is specialized in Digital Sculpture and Modelization of Statues, Miniature Figurines, Action Figures and mockup.",
    isGroup: true,
    members: 'Jared Leto & co',
  });

  await Performer.create({
    name: 'Orlando Consort',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/e/eb/30_Seconds_to_Mars%2C_Anfiteatro_Camerini_%282%29.jpg',
    affiliation: null,
    achievement: null,
    details: "The Orlando Consort has made an international reputation in the field of medieval and renaissance vocal music and, though the group's imaginative programming, also embraces jazz, film and world music. The Consort regularly tours throughout the UK, Europe and the USA (including BBC Proms, Carnegie Hall, Edinburgh & Lucerne Festivals) and has recorded for Deutsche Grammophon and Harmonia Mundi USA (including 2 Gramophone Awards). The Consort is currently recording a 12-disc Machaut project with Hyperion Records.",
    isGroup: true,
    members: 'Jared Leto & co',
  });

  await Performer.create({
    name: 'Gianni Morandi',
    image:
      'http://2.citynews-perugiatoday.stgy.ovh/~media/original-hi/70001287854077/gianni_morandi_1-2.jpg',
    affiliation: 'Cantante solista - Collaborazioni con Jax e Rovazzi',
    achievement: 'Premio Regia Televisiva nella categoria Top Ten con C\'era un ragazzo(1999) - Premio Lunezia per l Album "Grazie a tutti"(2010) - Premio Regia Televisiva nella categoria Top Ten con Grazie a tutti(2010) - Premio Regia Televisiva nella categoria Top Ten con Festival di Sanremo (2014) - Premio Regia Televisiva nella categoria Evento tv dell\'anno con Gianni Morandi - Live in Arena',
    details: 'Gianni Morandi, registered as Gian Luigi Morandi (Monghidoro, 11 December 1944), is an Italian singer, actor and TV presenter. Occasionally he has also been singer- songwriter and composer for other artists.He is considered one of the cornerstones of Italian light music, with over 50 million records sold worldwide.He was also honorary president of Bologna F.C.from 2010 to 2014. He conducted the Italian Song Festival for two editions: 2011 and 2012.',
    isGroup: false,
    members: null,
  });

  // Categories
  ['music', 'opera', 'theater', 'dance', 'seminar'].map(async (el) => {
    await Category.create({
      type: el,
    });
  });

  //Seminars

  await Seminar.create({
    title: 'A DIVE INTO THE SEA THAT CHANGES',
    image:
      'https://img.pngio.com/imis-conferences-events-asi-seminar-png-442_299.png',
    date: new Date(),
    abstract: 'The theme of climate change, one of the most topical and urgent research topics for marine biologists and ecologists, represents one of the most serious challenges in the field of scientific knowledge, in particular for the implications on the future of humanity. This fundamental issue will be the focus of the public seminar coordinated and promoted by the experts of the Zoological Station Anton Dohrn "A dive into the changing sea. The popular-scientific event is organized as an introduction to the artistic event "SKULL ARK" by Clara Iannotta. The event will aim to illustrate the uniqueness of the sea of the Green Island and the marine protected area that surrounds it, aiming at the study of its areas most affected by climate change and, consequently, the marine ecosystem. During the event will be open to the public a photographic exhibition dedicated to the emission systems present in Ischia, created by Pasquale Vassallo.',
    location: 'Auditorium 2',
    categoryId: 5,
  });

  await Seminar.create({
    title: 'HOPE: THE BIRTH OF EUROPE',
    image:
      'https://img.pngio.com/imis-conferences-events-asi-seminar-png-442_299.png',
    date: new Date(),
    abstract: 'Daniel Blake, an honest 59-year-old carpenter who was unable to work as a result of a heart attack, was refused a request for disability benefit by the State, thus starting an exhausting fight against the English bureaucracy. Winner at the last Cannes Film Festival (our review and the meeting with Ken Loach) just before the vote destined to irreparably change the structure of the European Union, "I, Daniel Blake" comes at a critical moment in the history of Great Britain. In a way, in Ken Loach\'s film we can find some of the reasons for the result of the referendum on Brexit. A terrible error of judgment dictated by the fear and anger of people like Daniel, unheard workers left alone. "I, Daniel Blake" is an important film, because it vividly depicts the reality of a desperate working class. A strongly British work, yes, but which clearly analyses a common problem.',
    location: 'Auditorium 1',
    categoryId: 5,
  });

  await Seminar.create({
    title: 'THE NEW LANGUAGE OF THE CIRCUS',
    image:
      'https://img.pngio.com/imis-conferences-events-asi-seminar-png-442_299.png',
    date: new Date(),
    abstract: 'Many countries are legislating to transform the circus show into an artist-only show. With many difficulties, a national law has been passed that provides for the gradual disposal of animals, although at the moment there is still no implementing regulation. The Conference aims to discuss the future of the "Circus" by addressing the problems that will arise with the entry into operation of the national law, both for the traditional and contemporary circus.',
    location: 'Auditorium 1',
    categoryId: 5,
  });

  await Seminar.create({
    title: 'LA PASSION DE JEANNE D\'ARC',
    image:
      'https://img.pngio.com/imis-conferences-events-asi-seminar-png-442_299.png',
    date: new Date(),
    abstract: 'Condemned unseen in France on its release, vilified by the Catholic authorities and even banned outright in England, Carl Theodor Dreyer’s LaPassion de Jeanne d’Arc is widely recognised as a silent masterpiece, regularly appearing in lists of the top ten greatest films ever made. Inspired by Dreyer’s vision, the award-winning Orlando Consort present an entirely new, carefully crafted soundtrack of music from the era in which the film is set. The intricate beauty of 15th century works by Binchois and Dufay, together with animated motets and haunting plainsong, amplify the poignant depiction of medieval France and provide a unique and highly evocative accompaniment to this landmark film.',
    location: 'Auditorium 1',
    categoryId: 5,
  });

  await Seminar.create({
    title: 'MI FAI VOLARE',
    image:
      'https://img.pngio.com/imis-conferences-events-asi-seminar-png-442_299.png',
    date: new Date(),
    abstract: 'Festival ',
    location: 'Ippodromo di San siro',
    categoryId: 5,
  });

  //Artistic events
  await Artistic.create({
    title: 'SKULL ARK',
    image:
      './assets/images/artistic_events/SKULL_ARK_1.jpg',
    date: new Date(),
    abstract: 'There is a sponge, known as a venus or glass sponge basket, which lives in the marine abyss and in which a shrimp couple lives. Entering the sponge in the form of larvae the shrimp can no longer get out of it and spends their entire existence there. This radical isolation symbolically recalls a current phenomenon: the multiplication of connection possibilities provided by technology and the tendency to withdraw completely into a private sphere where the only window on the world is the virtual one. Clara Iannotta and Anna Kubelik musically and visually overturn this concept by creating a structure that encloses four performers by building a private space around them, so private that they think there is nothing else around. Paradoxically, the intimacy of their slowly revealed private dimension becomes the object of our gaze. This installation, like other works by Iannotta, is a real sound environment, an “audio-visual” tool, where sound and movement are closely related and essential to each other.',
    factsheet: '- Clara Iannotta, Music and concept - Anna Kubelik, Architecture - Eva G. Alonso, Light Design - Paolo Mariangeli, Chris Swithinbank, Sound engineer',
    price: 12.99,
    categoryId: 2,
    seminarId: null,
  });

  await Artistic.create({
    title: 'ALL THE GOOD',
    image: './assets/images/artistic_events/ALL_GOOD_1.jpg',
    date: new Date(),
    abstract: 'All the good tells a story about loss and hope. A love story at a time in which Europe is sacrificing its values and a large group of people are succumbing to hate and incomprehension. The story of a family of artists with their everyday cares and the omnipresent death, which mercilessly imposes itself both in the seclusion of their home and in the outside world. In 2014 Jan Lauwers met the Israeli elite soldier and war veteran Elik Niv who, following a serious accident and a long rehabilitation process, became a professional dancer. They had long discussions about his military operations and his development as a dancer in the safely subsidised world of the living arts in Germany. It was during these conversations that the bombs exploded at Zaventem airport and Maalbeek metro station.',
    factsheet: '· Jan Lauwers, Text, direction, set  · Maarten Seghers, Music · Lot Lemm, Costumes · Elke Janssens, Dramaturgy · Ken Hioco, Technical Director, Lighting Design, set · Marjolein Demey, Production Management ',
    price: 20.99,
    categoryId: 3,
    seminarId: 1,
  });

  await Artistic.create({
    title: 'REGENORCHESTER XII',
    image:
      './assets/images/artistic_events/REGENORCHESTER_XII_1.jpg',
    date: new Date(),
    abstract: 'Regenorchester is a project by Austrian musician, Franz Hautzinger which began in London in the 90s. Every version of the “orchestra of the rain” forsees a different line-up blending different genres such as jazz, improvisation, rock, electronic, and mixing digital and analogue. The project is named after the rain in London that during the first concert was coming down incessantly.The only factor that remains the same  is the presence of Hautzinger himself, who in Transart will perform with the phenomenal guitarist and DJ,Otomo Yoshihide, and the laptop poet, Christian Fennesz,as well as the navigated bassist, Luc Ex, and lastly the Australian percussionist, Tony Buck, a member of “The Necks”. An incredibly creative combo in the field of experimental music, capable of surprising and going beyond the boundaries of the art of sound.',
    factsheet: '· Franz Hautzinger, Tp + Quartertone Tp · Christian Fennesz, G + Electronics · Otomo Yoshihide, G + Turntables · Luc Ex, E-B · Tony Buck, Ds + Perc',
    price: 10,
    categoryId: 1,
    seminarId: 2,
  });

  await Artistic.create({
    title: 'INAUDITO',
    image:
      './assets/images/artistic_events/INAUDITO_1.jpg',
    date: new Date(),
    abstract: '“Inaudito” literally means something that has never been heard before, something that is extraordinary and incredible. “Inaudito” is an out of the ordinary event, but it\'s audacious nature is what intrigues us, and it is exactly this mood that “Inaudito” relies on. A 5 hour music event that\'s rarely, if not ever before been heard revolving around the two American stars, John Cage and Julius Eastman. This event will take place inside the private museum, which has been hewn into the porphyry rock of the Foundation Dalle Nogare. This is not the typical concert, everything is turned upside down, and the audience will have the chance to choose between the opposite poles of Eastman\'s furious music and Cage\'s Zen mood. This will be a unique and sincere experience of listening without judgement, but again don’t expect to hear any musical notes. ',
    factsheet: '· Eugene Ughetti, Concept, Co-Director, Composer and Instrument Design · Clare Britton, Co-Director · Dr. Philip Samartzis, Sound Artist & Field Recordings · Matthias Schack-Arnott & Eugene Ughetti, Performers · Either Tucker, Lighting Designer ',
    price: 12.99,
    categoryId: 1,
    seminarId: 1,
  });

  await Artistic.create({
    title: 'POLAR FORCE',
    image:
      './assets/images/artistic_events/INAUDITO_1.jpg',
    date: new Date(),
    abstract: 'Imagine being on the Antarctic ice shelf, housed inside a temporary shelter where you are intimately observing aural experiments using the raw polar energies collected from outside. In an investigation of extreme wind and ice, pristine Antarctic field recordings combine with live industrial percussion to envelope the audience in a visceral soundscape and performance environment. Unsure whether you’re witnessing a sinister activity, cutting edge scientific research or part of a dangerous polar expedition, Polar Force makes us rethink our relationship to the natural world and explores notions of human fragility and isolation from the perspective of the coldest, windiest and driest continent on earth.    ',
    factsheet: '· Nick Roux, Sound Design, Audio System Design, Instrument Design & Construction · Tilman Robinson, Sound Engineer · Megafun, Production & Technical Management · Dr. Malte Wagenfield, RMIT Industrial Design Atelier Leader & Air Consultant · Sheah Sutton, Producer',
    price: 12.99,
    categoryId: 4,
    seminarId: 3,
  });

  await Artistic.create({
    title: 'SANTA GIOVANNA D\'ARCO',
    image:
      'https://media.resources.festicket.com/image/2x1/smart/filters:blur(3):quality(40)/www/photos/SONUSFestival2020_V1.jpg',
    date: new Date(),
    abstract: '"Santa Giovanna D\'Arco", the musical, is not intended to be a theatrical re-enactment of the figure of the Pulzella d\'Orléans. Its gestures, its name, sound like a thunderbolt in the clear sky within that dark period of the Hundred Years\' War that gripped Europe with no apparent way out. But this musical is a simple itinerary in prose and music around some facts and different emotions that marked that fantastic episode of more than 500 years ago. A poetic journey sung and danced around the love, pain and faith of a young woman enlightened by God. Heroism itself, self-sacrifice for a just ideal, honour, betrayal, hard clash with reality, the spectre of heresy, affection for one\'s neighbor, battles dripping with blood, are all elements of those events of many years ago on which the voice and will of God always prevails. God, through Joan, tries to make his way in the hearts of men blinded by reasons of state and age-old issues. And the Girl of Orléans goes beyond, she becomes in the musical the very symbol of purity. It represents the sweetest love poem addressed to the One who made her hold a sword in the name of freedom and in the name of a future peace on earth which, thanks to the gesture of a girl like many others, later became perhaps more lasting. Joan, betrayed heroine, fervent believer and sacrificed as one of the many martyrs sent to the stake by History, more than a character, in this musical is one of the most beautiful songs of history itself. One of those beautiful songs that speak of love for humanity. And we, in our times, should feel the need.',
    factsheet: '- Written by Piero Castellacci - Music by Michele Paulicelli - Choreographies by Claudio Meloni - Costumes by Giancarlo Colis - Directed by Ugo Gregoretti- Subject Joseph Delteil - Photography Rudolph Maté - Editing Marguerite Beaugé, Carl Theodor Dreyer',
    price: 11.99,
    categoryId: 2,
    seminarId: 4,
  });

  await Artistic.create({
    title: 'HUMANS',
    image:
      'https://media.resources.festicket.com/image/2x1/smart/filters:blur(3):quality(40)/www/photos/SONUSFestival2020_V1.jpg',
    date: new Date(),
    abstract: 'Ten acrobats accompany us on an exciting journey through the complexity of human nature. Exploring the physical limits of their bodies, subjecting them to extreme efforts, they go deep into the question of how much, as human beings, we can really bear. How much weight can we carry? Who can we trust to bear our burden? It\'s a reflection on our lives, the people we love, the burdens we have to carry and the physical and emotional strength we need.',
    factsheet: 'World premiere Sydney, Australia 2017 - Performers 10 - Duration 70 minutes - Touring History Australia, Italy, UK, Belgium, Romania, France, Hungary, USA. ',
    price: 11.99,
    categoryId: 2,
    seminarId: 2,
  });

  await Artistic.create({
    title: 'THE BEST OF GIANNI MORANDI',
    image:
      './assets/images/artistic_events/SKULL_ARK_1.jpg',
    date: new Date(),
    abstract: 'There is a sponge, known as a venus or glass sponge basket, which lives in the marine abyss and in which a shrimp couple lives. Entering the sponge in the form of larvae the shrimp can no longer get out of it and spends their entire existence there. This radical isolation symbolically recalls a current phenomenon: the multiplication of connection possibilities provided by technology and the tendency to withdraw completely into a private sphere where the only window on the world is the virtual one. Clara Iannotta and Anna Kubelik musically and visually overturn this concept by creating a structure that encloses four performers by building a private space around them, so private that they think there is nothing else around. Paradoxically, the intimacy of their slowly revealed private dimension becomes the object of our gaze. This installation, like other works by Iannotta, is a real sound environment, an “audio-visual” tool, where sound and movement are closely related and essential to each other.',
    factsheet: '- Clara Iannotta, Music and concept - Anna Kubelik, Architecture - Eva G. Alonso, Light Design - Paolo Mariangeli, Chris Swithinbank, Sound engineer',
    price: 12.99,
    categoryId: 1,
    seminarId: 5,
  });

  //evento 1
  await ArtisticPerformer.create({
    artisticId: 1,
    performerId: 1,
    seminarId: 1,
  });

  // evento 2
  await ArtisticPerformer.create({
    artisticId: 2,
    performerId: 2,
    seminarId: null,
  });

  await ArtisticPerformer.create({
    artisticId: 2,
    performerId: 3,
    seminarId: null,
  });

  //evento 3
  await ArtisticPerformer.create({
    artisticId: 3,
    performerId: 4,
    seminarId: 2,
  });


  // evento 4
  await ArtisticPerformer.create({
    artisticId: 4,
    performerId: 1,
    seminarId: 1,
  });

  // evento 5
  await ArtisticPerformer.create({
    artisticId: 5,
    performerId: 5,
    seminarId: 3,
  });

  // evento 6
  await ArtisticPerformer.create({
    artisticId: 6,
    performerId: 4,
    seminarId: 4,
  });

  await ArtisticPerformer.create({
    artisticId: 6,
    performerId: 6,
    seminarId: 4,
  });

  // evento 7
  await ArtisticPerformer.create({
    artisticId: 7,
    performerId: 5,
    seminarId: 2,
  });

  await ArtisticPerformer.create({
    artisticId: 7,
    performerId: 6,
    seminarId: 2,
  });

  // evento 8
  await ArtisticPerformer.create({
    artisticId: 8,
    performerId: 7,
    seminarId: 5,
  });


}
