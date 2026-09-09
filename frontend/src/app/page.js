import Navbar from '../components/Navbar';
import PortfolioContent from '../components/PortfolioContent';

import { getProfile } from '../services/profileService';
import { getSkills } from '../services/skillService';
import { getExperience } from '../services/experienceService';
import { getEducation } from '../services/educationService';
import { getProjects } from '../services/projectService';

export const revalidate = 60;

export default async function HomePage() {
  const [profileData, skillsData, experienceData, educationData, projectsData] = await Promise.all([
    getProfile(),
    getSkills(),
    getExperience(),
    getEducation(),
    getProjects(),
  ]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar />
      <PortfolioContent
        initialProfileData={profileData}
        initialSkills={skillsData}
        initialExperience={experienceData}
        initialEducation={educationData}
        initialProjects={projectsData}
      />
    </div>
  );
}
