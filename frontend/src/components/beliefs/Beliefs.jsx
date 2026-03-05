import React, { useState } from 'react';
import './Beliefs.css';

const Beliefs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const fundamentalBeliefs = [
    { title: "The Holy Scriptures", content: "The Holy scriptures, old and New Testaments, are the written word of God, given by divine inspiration through holy men of God who spoke and wrote as they were moved by the Holy Spirit. (2nd Peter 1:20, 21; 2 Tim. 3:16, 17; Ps.119:105)" },
    { title: "The Godhead", content: "There is one God: Father, Son, and Holy Spirit, a unity of co-external persons. God is immortal, all powerful, all knowing, above all, and ever present. (Deut 6:4; Matt.28:19; 2Cor.13:14; Eph. 4:4-6)" },
    { title: "The Father", content: "God the eternal father is creator, sustainer and sovereign of all creation. (Gen. 1:1; Rev.4:11; 1Cor.15:28; John 4:8; 1Tim 1:17; Ex.34:6, 7.)" },
    { title: "The Son", content: "God the eternal Son became incarnation in Jesus Christ. Through Him all things were created, the character of God is revealed, the salvation of humanity is accomplished and the world is judged. (John1:1-3, 14; Col 1:15-19; John 10:30; Rom.6:23; 2Cor.5:17-19)" },
    { title: "The Holy Spirit", content: "God the eternal spirit was active with the father and the son in creation, incarnation and redemption. He inspired the writers of the scriptures. (Gen 1:1-2; Luke 1:35, 4:18; Acts 10:38; 2Peter 1:21; 2Cor3:18)" },
    { title: "The Creation", content: "God is the creator of all things and has revealed in scriptures the authentic account of his creativity. (Gen 1:2; Ex.20:8-11; Ps 19:1-6; 33:6, 9; Heb 11:3)." },
    { title: "The Nature of Man", content: "Man and woman were made in the image of God with individuality, the power and the freedom to do so. Though created free beings each is an indivisible unity of body mind and spirit. (Gen1:26-28; 2:7; Ps 8:4-8; Acts 17:24-28)" },
    { title: "The Great Controversy", content: "All humanity is now involved in a great controversy between Christ and Satan regarding the character of God, His law, and His sovereignty over the universe. (Rev. 12:4-9; Isa. 14:12-14; Eze. 28:12-18)" },
    { title: "Life, Death, Resurrection of Christ", content: "In Christ’s life of perfect obedience, His suffering, death, and resurrection, God provided the only means of atonement for human sin. (John 3:16; Isa. 53; 1 Peter 2:21, 22; 1Cor.15:3-4)" },
    { title: "The Experience of Salvation", content: "In infinite love and mercy God made Christ, who knew no sin, to be sin for us, so that in Him we might be made the righteousness of God. (2 Cor. 5:17-21; Gal. 1:4; John 3:16; Rom. 8:14-17)" },
    { title: "Growing in Christ", content: "By his death on the cross Jesus triumphed over the forces of evil. He has broken their power and made certain their ultimate doom. (Ps 1:1, 2; Col 1:13-14; Gal 5:22-25; Rom 5:38, 39)" },
    { title: "The Church", content: "The church is the community of believers who confess Jesus Christ as Lord and Saviour. (Gen. 12:3; Acts 7:38; Eph. 4:11-15; Matt 28:19, 20)" },
    { title: "The Remnant and Its Mission", content: "The universal church is composed of all who truly believe, but in last days, a remnant has been called out to keep the commandments of God. (Rev. 12:17; 14:6-12; 18:1-4; 1 Peter 1:16-19)" },
    { title: "Unity in the Body of Christ", content: "The church is one body with many members, called from every kindred, tongue, and people. (Rom. 12:4, 5; 1 Cor. 12:12-14; John 17:20-23)" },
    { title: "Baptism", content: "By baptism we confess our faith in the death and resurrection of Jesus Christ, and testify of our death to sin. (Rom. 6:1-6; Col. 2:12, 13; Acts. 16:30-33.)" },
    { title: "The Lord’s Supper", content: "The Lord’s Supper is a participation in the emblems of the body and blood of Jesus as an expression of faith in Him. (1 Cor. 10:16, 17; 11:23-30; Matt. 26:17-30)" },
    { title: "Spiritual Gifts and Ministries", content: "God bestows upon all members spiritual gifts which each member is to employ in loving ministry for the common good. (Rom. 12:4-8; 1 Cor. 12:9-11; Eph. 4:8, 11-16)" },
    { title: "The Gift of Prophecy", content: "One of the gifts of the Holy Spirit is prophecy. This gift is an identifying mark of the remnant church and was manifested in the ministry of Ellen G. White. (Joel 2:28, 29; Rev 19:10)" },
    { title: "The Law of God", content: "The great principles of God’s law are embodied in Ten Commandments and exemplified in life of Christ. (Ex. 20:1-17; Ps. 40:7, 8; Matt. 22:36-40; Heb. 8:8-10)" },
    { title: "The Sabbath", content: "The beneficent Creator, after the six days creation, rested on the seventh day and instituted the Sabbath for all people. (Gen. 2:1-3; Ex.20:8-11; Luke 4:16; Eze.20:12,20)" },
    { title: "Stewardship", content: "We are God’s stewards, entrusted with time, opportunities, abilities and possessions. We are responsible to Him for their proper use. (Gen.1:26-28; 1Chron. 29:14; Mal 3:8-12)" },
    { title: "Christian Behavior", content: "We are called to be a godly people who think, feel and act in harmony with the principles of heaven. (Rom 12:1; 1 John 2:6; 1 Cor 10:31; Lev. 11:1-47)" },
    { title: "Marriage and the Family", content: "Marriage was divinely established in Eden and affirmed by Jesus to be a lifelong union between a man and a woman. (Gen. 2:18-25; Matt 19:3-9; Eph. 5:21-33)" },
    { title: "Christ’s Ministry in Sanctuary", content: "There is a sanctuary in heaven, the true tabernacle, which the lord set up, and not man. (Heb. 8:1-5; 4:14-16; 9:11-28; Dan 7:9-27)" },
    { title: "Second Coming of Christ", content: "The second coming of Jesus Christ is the blessed hope in the church, the grand climax of the gospel. (Titus 2:13; Heb.9:11-28; John 14:1-4; Rev 14:14-20)" },
    { title: "Death and Resurrection", content: "The wages of sin is death. Until that day death is an unconscious state for all people. (Rom.6:23; 1Tim 6:15; Ecc. 9:5, 6; 1Thess.4:13-17)" },
    { title: "Millennium and End of Sin", content: "The millennium is the thousand-year reign of Christ with His saints in heaven between the first and second resurrections. (Rev 20; 1Cor. 6:2, 3; Jer.4:23-26)" },
    { title: "The New Earth", content: "On the new earth, God will provide an eternal home for the redeemed and a perfect environment for everlasting life. (2Peter 3:13; Isa.65:17-25; Rev.21:1-7)" }
  ];

  return (
    <div className="beliefs-container">
      <header className="beliefs-header">
        <h1>FUNDAMENTAL BELIEFS</h1>
        <p>SDA Church</p>
      </header>
      <div className="beliefs-body">
        <nav className="beliefs-sidebar">
          <ul>
            {fundamentalBeliefs.map((belief, index) => (
              <li
                key={index}
                className={activeTab === index ? 'active' : ''}
                onClick={() => setActiveTab(index)}
              >
                {index + 1}. {belief.title}
              </li>
            ))}
          </ul>
        </nav>
        <main className="beliefs-content">
          <div className="content-card">
            <h2>{fundamentalBeliefs[activeTab].title}</h2>
            <hr />
            <p>{fundamentalBeliefs[activeTab].content}</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Beliefs;