'use client';

import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import Chatbot from './Chatbot';

import { getProfile } from '../services/profileService';
import { getSkills } from '../services/skillService';
import { getExperience } from '../services/experienceService';
import { getEducation } from '../services/educationService';
import { getProjects } from '../services/projectService';

export default function PortfolioContent({
  initialProfileData,
  initialSkills,
  initialExperience,
  initialEducation,
  initialProjects,
}) {
  const [profileData, setProfileData] = useState(initialProfileData);
  const [skills, setSkills] = useState(initialSkills);
  const [experience, setExperience] = useState(initialExperience);
  const [education, setEducation] = useState(initialEducation);
  const [projects, setProjects] = useState(initialProjects);

  const refreshData = async () => {
    try {
      const [pData, sData, expData, eduData, projData] = await Promise.all([
        getProfile(),
        getSkills(),
        getExperience(),
        getEducation(),
        getProjects(),
      ]);
      setProfileData(pData);
      setSkills(sData);
      setExperience(expData);
      setEducation(eduData);
      setProjects(projData);
    } catch (err) {
      console.warn('Error refreshing portfolio content:', err);
    }
  };

  useEffect(() => {
    // Refresh on mount to get any locally updated admin changes
    refreshData();

    // Listen to admin update events
    window.addEventListener('portfolio_data_updated', refreshData);
    window.addEventListener('storage', refreshData);
    return () => {
      window.removeEventListener('portfolio_data_updated', refreshData);
      window.removeEventListener('storage', refreshData);
    };
  }, []);

  const profile = profileData?.profile;
  const stats = profileData?.stats;
  const aboutFeatures = profileData?.aboutFeatures;

  return (
    <>
      <main>
        <Hero profile={profile} />
        <About profile={profile} stats={stats} aboutFeatures={aboutFeatures} />
        <Experience experienceList={experience} />
        <Skills skillsList={skills} />
        <Education educationList={education} />
        <Projects projectsList={projects} />
        <Contact profile={profile} />
      </main>

      <Footer profile={profile} />
      <Chatbot />
    </>
  );
}
