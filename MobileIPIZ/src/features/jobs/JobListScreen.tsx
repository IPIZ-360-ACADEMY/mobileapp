import React, { FC, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { JobsStackParamList } from '../../navigation/AppNavigator';
import { Job, JobType, JobStatus } from '../../types/job.types';

type Props = NativeStackScreenProps<JobsStackParamList, 'JobList'>;

// ─── Color constants ─────────────────────────────────────────────────────────
const COLORS = {
  headerBg: '#1E3A8A',
  white: '#FFFFFF',
  cardBg: '#FFFFFF',
  screenBg: '#F1F5F9',
  searchBg: '#FFFFFF',
  pillActiveBg: '#1E3A8A',
  pillInactiveBg: '#FFFFFF',
  pillActiveText: '#FFFFFF',
  pillInactiveText: '#1E3A8A',
  pillActiveBorder: '#1E3A8A',
  pillInactiveBorder: '#CBD5E1',
  avatarBg: '#DBEAFE',
  avatarText: '#1E3A8A',
  titleText: '#0F172A',
  bodyText: '#475569',
  mutedText: '#94A3B8',
  locationText: '#64748B',
  tagBorder: '#CBD5E1',
  tagText: '#475569',
  tagBg: '#F8FAFC',
  applyBtn: '#1E3A8A',
  applyBtnText: '#FFFFFF',
  sectionTitle: '#0F172A',
  divider: '#E2E8F0',
  placeholderText: '#94A3B8',
  searchIconColor: '#94A3B8',
};

// ─── Mock data ────────────────────────────────────────────────────────────────
interface PartnerCompany {
  id: string;
  name: string;
  initials: string;
  vagas: number;
  color: string;
}

const partnerCompanies: PartnerCompany[] = [
  { id: 'p1', name: 'Sonangol',  initials: 'SG', vagas: 25, color: '#FEF3C7' },
  { id: 'p2', name: 'Odebrecht', initials: 'OD', vagas: 18, color: '#FCE7F3' },
  { id: 'p3', name: 'Petrobras', initials: 'PB', vagas: 12, color: '#DCFCE7' },
  { id: 'p4', name: 'ENI',       initials: 'EN', vagas: 10, color: '#EDE9FE' },
  { id: 'p5', name: 'Technip',   initials: 'TC', vagas: 8,  color: '#FFEDD5' },
];

type FilterKey = 'Estagios' | 'Empregos' | 'Civil' | 'Mecanica' | 'Eletrica';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'Estagios',  label: 'Estágios'  },
  { key: 'Empregos',  label: 'Empregos'  },
  { key: 'Civil',     label: 'Civil'     },
  { key: 'Mecanica',  label: 'Mecânica'  },
  { key: 'Eletrica',  label: 'Elétrica'  },
];

const mockJobs: Job[] = [
  {
    id: '1',
    companyId: 'c1',
    companyName: 'Sonangol',
    title: 'Técnico em Manutenção Industrial',
    description: 'Realizar manutenção preventiva e corretiva em equipamentos industriais.',
    requirements: ['Formação técnica', 'Experiência de 2 anos'],
    skills: ['Mecânica', 'Elétrica', 'Hidráulica'],
    type: JobType.FULL_TIME,
    status: JobStatus.OPEN,
    location: 'Luanda, Angola',
    salaryRange: '150.000 - 250.000 Kz',
    postedAt: '2026-02-10',
    deadline: '2026-03-10',
  },
  {
    id: '2',
    companyId: 'c2',
    companyName: 'Empresa Industrial ABC',
    title: 'Estágio em Eletrotécnica',
    description: 'Oportunidade de estágio para estudantes de eletrotécnica.',
    requirements: ['Cursando técnico', 'Conhecimento básico'],
    skills: ['Eletricidade', 'Circuitos', 'Instrumentação'],
    type: JobType.INTERNSHIP,
    status: JobStatus.OPEN,
    location: 'Viana, Angola',
    salaryRange: '50.000 - 80.000 Kz',
    postedAt: '2026-02-12',
    deadline: '2026-02-28',
  },
  {
    id: '3',
    companyId: 'c3',
    companyName: 'Indústria Nacional',
    title: 'Operador de Máquinas CNC',
    description: 'Operar e programar máquinas CNC para produção industrial.',
    requirements: ['Formação técnica', 'Experiência com CNC'],
    skills: ['CNC', 'Programação', 'Mecânica de Precisão'],
    type: JobType.FULL_TIME,
    status: JobStatus.OPEN,
    location: 'Luanda, Angola',
    salaryRange: '200.000 - 350.000 Kz',
    postedAt: '2026-02-15',
    deadline: '2026-03-15',
  },
  {
    id: '4',
    companyId: 'c4',
    companyName: 'Petrobras Angola',
    title: 'Estágio em Engenharia Civil',
    description: 'Suporte a projetos de infraestrutura e obras civis.',
    requirements: ['Cursando engenharia civil', 'Disponibilidade integral'],
    skills: ['Civil', 'AutoCAD', 'Topografia'],
    type: JobType.INTERNSHIP,
    status: JobStatus.OPEN,
    location: 'Cabinda, Angola',
    salaryRange: '80.000 - 120.000 Kz',
    postedAt: '2026-02-18',
    deadline: '2026-03-20',
  },
  {
    id: '5',
    companyId: 'c5',
    companyName: 'ENI Angola',
    title: 'Técnico Elétrico Sénior',
    description: 'Supervisão e manutenção de sistemas elétricos industriais.',
    requirements: ['Formação técnica', '5 anos de experiência'],
    skills: ['Elétrica', 'SCADA', 'Alta Tensão'],
    type: JobType.FULL_TIME,
    status: JobStatus.OPEN,
    location: 'Luanda, Angola',
    salaryRange: '350.000 - 500.000 Kz',
    postedAt: '2026-02-20',
    deadline: '2026-03-25',
  },
];

// ─── Helper ───────────────────────────────────────────────────────────────────
function timeAgo(dateStr: string): string {
  const posted = new Date(dateStr);
  const now = new Date('2026-03-12');
  const diffDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  return `${diffDays} dias atrás`;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const CompanyCircle: FC<{ company: PartnerCompany }> = ({ company }) => (
  <View style={styles.companyCircleWrapper}>
    <View style={[styles.companyCircle, { backgroundColor: company.color }]}>
      <Text style={styles.companyCircleInitials}>{company.initials}</Text>
    </View>
    <Text style={styles.companyCircleName} numberOfLines={1}>
      {company.name}
    </Text>
    <Text style={styles.companyCircleVagas}>{company.vagas} vagas</Text>
  </View>
);

const JobCard: FC<{ job: Job; onPress: () => void }> = ({ job, onPress }) => (
  <View style={styles.jobCard}>
    <View style={styles.jobCardTop}>
      <View style={[styles.jobLogoCircle, { backgroundColor: COLORS.avatarBg }]}>
        <Text style={styles.jobLogoText}>{getInitials(job.companyName)}</Text>
      </View>
      <View style={styles.jobCardMeta}>
        <Text style={styles.jobCardTitle} numberOfLines={2}>
          {job.title}
        </Text>
        <Text style={styles.jobCardCompany}>{job.companyName}</Text>
        <View style={styles.jobCardLocation}>
          <Text style={styles.locationPin}>{'📍'}</Text>
          <Text style={styles.jobCardLocationText}>{job.location}</Text>
        </View>
      </View>
    </View>

    <View style={styles.skillTagsRow}>
      {job.skills.slice(0, 3).map((skill, i) => (
        <View key={i} style={styles.skillTag}>
          <Text style={styles.skillTagText}>{skill}</Text>
        </View>
      ))}
    </View>

    <View style={styles.jobCardBottom}>
      <Text style={styles.jobCardTime}>{timeAgo(job.postedAt)}</Text>
      <Pressable
        style={({ pressed }) => [styles.applyBtn, pressed && { opacity: 0.75 }]}
        onPress={onPress}
        android_ripple={{ color: '#1d4ed8' }}
      >
        <Text style={styles.applyBtnText}>Candidatar</Text>
      </Pressable>
    </View>
  </View>
);

// ─── Screen ───────────────────────────────────────────────────────────────────
export const JobListScreen: FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('Estagios');

  const filteredJobs = mockJobs.filter((job) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(q) ||
      job.companyName.toLowerCase().includes(q);

    let matchesFilter = true;
    if (activeFilter === 'Estagios') {
      matchesFilter = job.type === JobType.INTERNSHIP;
    } else if (activeFilter === 'Empregos') {
      matchesFilter = job.type === JobType.FULL_TIME;
    } else if (activeFilter === 'Civil') {
      matchesFilter = job.skills.some((s) => s.toLowerCase().includes('civil'));
    } else if (activeFilter === 'Mecanica') {
      matchesFilter = job.skills.some((s) => s.toLowerCase().includes('mecân'));
    } else if (activeFilter === 'Eletrica') {
      matchesFilter = job.skills.some(
        (s) => s.toLowerCase().includes('elétr') || s.toLowerCase().includes('eletr'),
      );
    }

    return matchesSearch && matchesFilter;
  });

  // First two jobs shown as horizontal scroll cards (recommended)
  const recommendedJobs = filteredJobs.slice(0, 2);
  // Rest shown as vertical list
  const remainingJobs = filteredJobs.slice(2);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerBg} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLogoArea}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>IP</Text>
          </View>
          <Text style={styles.logoLabel}>IPIZ</Text>
        </View>
        <Text style={styles.headerTitle}>Oportunidades</Text>
        <View style={styles.headerRight} />
      </View>

      {/* ── Search Bar ── */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>{'🔍'}</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar vagas..."
            placeholderTextColor={COLORS.placeholderText}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Empresas Parceiras ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Empresas Parceiras</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.companyScrollContent}
          >
            {partnerCompanies.map((company) => (
              <CompanyCircle key={company.id} company={company} />
            ))}
          </ScrollView>
        </View>

        {/* ── Filter Pills ── */}
        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            {FILTERS.map(({ key, label }) => {
              const active = activeFilter === key;
              return (
                <Pressable
                  key={key}
                  onPress={() => setActiveFilter(key)}
                  style={({ pressed }) => [
                    styles.filterPill,
                    active ? styles.filterPillActive : styles.filterPillInactive,
                    pressed && { opacity: 0.8 },
                  ]}
                  android_ripple={{ color: '#93C5FD' }}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      active ? styles.filterPillTextActive : styles.filterPillTextInactive,
                    ]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* ── Recomendados ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendados para você</Text>

          {recommendedJobs.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recommendedScrollContent}
            >
              {recommendedJobs.map((job) => (
                <View key={job.id} style={styles.recommendedCardWrapper}>
                  <JobCard
                    job={job}
                    onPress={() => navigation.navigate('JobDetail', { jobId: job.id })}
                  />
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Nenhuma vaga recomendada</Text>
            </View>
          )}
        </View>

        {/* ── Remaining Jobs Vertical List ── */}
        {remainingJobs.length > 0 && (
          <View style={[styles.section, styles.sectionLast]}>
            <Text style={styles.sectionTitle}>Mais vagas</Text>
            {remainingJobs.map((job) => (
              <View key={job.id} style={styles.verticalCardWrapper}>
                <JobCard
                  job={job}
                  onPress={() => navigation.navigate('JobDetail', { jobId: job.id })}
                />
              </View>
            ))}
          </View>
        )}

        {filteredJobs.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Nenhuma vaga encontrada</Text>
          </View>
        )}

        <View style={styles.scrollPadBottom} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.headerBg,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.headerBg,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerLogoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 64,
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  logoText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.headerBg,
  },
  logoLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    flex: 1,
  },
  headerRight: {
    width: 64,
  },
  // Search
  searchContainer: {
    backgroundColor: COLORS.headerBg,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.searchBg,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: COLORS.searchIconColor,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.titleText,
    paddingVertical: 0,
  },
  // ScrollView body
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.screenBg,
  },
  // Sections
  section: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  sectionLast: {
    paddingBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.sectionTitle,
    marginBottom: 14,
  },
  // Partner companies horizontal scroll
  companyScrollContent: {
    paddingRight: 16,
  },
  companyCircleWrapper: {
    alignItems: 'center',
    marginRight: 16,
    width: 68,
  },
  companyCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  companyCircleInitials: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.headerBg,
  },
  companyCircleName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.titleText,
    textAlign: 'center',
  },
  companyCircleVagas: {
    fontSize: 11,
    color: COLORS.mutedText,
    textAlign: 'center',
    marginTop: 2,
  },
  // Filter pills
  filterSection: {
    paddingTop: 16,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    paddingRight: 8,
  },
  filterPill: {
    borderRadius: 20,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: COLORS.pillActiveBg,
    borderColor: COLORS.pillActiveBorder,
  },
  filterPillInactive: {
    backgroundColor: COLORS.pillInactiveBg,
    borderColor: COLORS.pillInactiveBorder,
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: COLORS.pillActiveText,
  },
  filterPillTextInactive: {
    color: COLORS.pillInactiveText,
  },
  // Recommended horizontal scroll
  recommendedScrollContent: {
    paddingRight: 16,
  },
  recommendedCardWrapper: {
    width: 272,
    marginRight: 14,
  },
  // Vertical list
  verticalCardWrapper: {
    marginBottom: 14,
  },
  // Job Card
  jobCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  jobCardTop: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  jobLogoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  jobLogoText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.avatarText,
  },
  jobCardMeta: {
    flex: 1,
  },
  jobCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.titleText,
    marginBottom: 3,
    lineHeight: 20,
  },
  jobCardCompany: {
    fontSize: 12,
    color: COLORS.bodyText,
    marginBottom: 4,
  },
  jobCardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationPin: {
    fontSize: 11,
    marginRight: 3,
  },
  jobCardLocationText: {
    fontSize: 12,
    color: COLORS.locationText,
  },
  // Skill tags
  skillTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  skillTag: {
    borderWidth: 1,
    borderColor: COLORS.tagBorder,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
    backgroundColor: COLORS.tagBg,
  },
  skillTagText: {
    fontSize: 11,
    color: COLORS.tagText,
    fontWeight: '500',
  },
  // Card bottom row
  jobCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: 10,
  },
  jobCardTime: {
    fontSize: 12,
    color: COLORS.mutedText,
  },
  applyBtn: {
    backgroundColor: COLORS.applyBtn,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  applyBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.applyBtnText,
  },
  // Empty state
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: COLORS.mutedText,
  },
  scrollPadBottom: {
    height: 32,
  },
});

export default JobListScreen;
