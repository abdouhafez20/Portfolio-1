import { useState, useEffect, useMemo } from 'react'; 
import { FileText } from 'lucide-react'; 
import { useLanguage } from '@/hooks/useLanguage'; 
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal'; 
 
interface Props { 
  lang: ReturnType<typeof useLanguage>; 
} 
 
const projects = [ 
  { id: 1, title: 'Behavior Science Exam Night Revision', category: 'print', catLabel: 'Book & PDF', image: '/images/cover-1.jpg', pdfUrl: '/pdfs/file1.pdf' }, 
  { id: 2, title: 'Text Bank', category: 'print', catLabel: 'Book & PDF', image: '/images/cover-2.jpg', pdfUrl: 'https://your-pdf-link.com/pdf2.pdf' }, 
  { id: 3, title: 'Medical Lecture Deck', category: 'pptx', catLabel: 'Presentation', image: '/images/cover-3.jpg', pdfUrl: 'https://your-pdf-link.com/pdf3.pdf' }, 
  { id: 4, title: 'Clinical Pathways', category: 'mindmap', catLabel: 'Mind Map', image: '/images/cover-4.jpg', pdfUrl: 'https://your-pdf-link.com/pdf4.pdf' }, 
  { id: 5, title: 'Study Summary Sheets', category: 'print', catLabel: 'Summaries', image: '/images/cover-5.jpg', pdfUrl: 'https://your-pdf-link.com/pdf5.pdf' }, 
  { id: 6, title: 'Chapter Portfolio Sample', category: 'print', catLabel: 'Book & PDF', image: '/images/cover-6.jpg', pdfUrl: 'https://your-pdf-link.com/pdf6.pdf' }, 
  { id: 7, title: 'PU Sample', category: 'academic', catLabel: 'Academic', image: '/images/cover-7.jpg', pdfUrl: 'https://your-pdf-link.com/pdf7.pdf' }, 
  { id: 8, title: 'Immunity Sample', category: 'mindmap', catLabel: 'Mind Map', image: '/images/cover-8.jpg', pdfUrl: 'https://your-pdf-link.com/pdf8.pdf' }, 
  { id: 9, title: 'Behavior Science Full', category: 'print', catLabel: 'Book & PDF', image: '/images/cover-9.jpg', pdfUrl: 'https://your-pdf-link.com/pdf9.pdf' }, 
]; 
 
const filters = [ 
  { key: 'filter.all', value: 'all' }, 
  { key: 'filter.books', value: 'print' }, 
  { key: 'filter.presentations', value: 'pptx' }, 
  { key: 'filter.mindmaps', value: 'mindmap' }, 
  { key: 'filter.summaries', value: 'academic' }, 
]; 
 
export default function WorkSection({ lang }: Props) { 
  const { t } = lang; 
  const [activeFilter, setActiveFilter] = useState('all'); 
  const [modalProject, setModalProject] = useState<typeof projects[0] | null>(null); 
 
  const sectionRef = useIntersectionReveal(); 
 
  const filteredProjects = useMemo(() => { 
    if (activeFilter === 'all') return projects; 
    return projects.filter(p => p.category === activeFilter); 
  }, [activeFilter]); 
 
  useEffect(() => { 
    document.body.style.overflow = modalProject ? 'hidden' : ''; 
    return () => { document.body.style.overflow = ''; }; 
  }, [modalProject]); 
 
  return ( 
    <> 
      <section 
        id="work" 
        ref={sectionRef} 
        className="py-12 md:py-20 px-5 md:px-10 border-t border-card-border dark:border-dark-border" 
      > 
        <div className="max-w-screen-xl mx-auto"> 

          {/* HEADER */} 
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8"> 
            <div> 
              <span className="eyebrow">{t('work.title')}</span> 
              <h2 className="mt-1 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold"> 
                Volumes 2022–2026 
              </h2> 
              <p className="text-sm text-mist mt-2 max-w-sm"> 
                {t('work.subtitle')} 
              </p> 
            </div> 

            <div className="flex flex-wrap gap-2"> 
              {filters.map((f) => ( 
                <button 
                  key={f.value} 
                  onClick={() => setActiveFilter(f.value)} 
                  className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider border font-medium transition-all duration-200 ${ 
                    activeFilter === f.value 
                      ? 'border-forest dark:border-dark-forest text-forest dark:text-dark-forest bg-forest/5 dark:bg-dark-forest/8' 
                      : 'border-ink/15 dark:border-white/10 text-mist dark:text-dark-muted hover:border-forest/50 dark:hover:border-dark-forest/50 hover:text-ink dark:hover:text-dark-text' 
                  }`} 
                > 
                  {t(f.key)} 
                </button> 
              ))} 
            </div> 
          </div> 

          {/* GRID */} 
          <div className="grid grid-cols-4 md:grid-cols-4 gap-4"> 
            {filteredProjects.map((project) => ( 
              <div key={project.id} className="group cursor-pointer"> 
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black/8 dark:bg-white/6 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 hover:ring-forest/30 dark:hover:ring-dark-forest/30"> 

                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    loading="lazy" 
                  /> 

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" /> 

                  <div className="absolute bottom-0 p-4 w-full"> 
                    <div className="text-[9px] text-white/80 uppercase font-medium tracking-wide"> 
                      {project.catLabel} 
                    </div> 

                    <div className="text-white font-semibold text-sm truncate mt-1"> 
                      {project.title} 
                    </div> 

                    <button 
                      onClick={() => setModalProject(project)} 
                      className="mt-3 bg-white text-forest text-[10px] uppercase tracking-wider font-medium px-4 py-2 rounded-full flex items-center gap-1.5" 
                    > 
                      <FileText size={16} /> 
                      View PDF 
                    </button> 
                  </div> 
                </div> 
              </div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* MODAL FIXED */} 
      {modalProject && ( 
        <div 
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur flex items-center justify-center p-4" 
          onClick={() => setModalProject(null)} 
        > 

          <div 
            className="bg-white dark:bg-dark-card rounded-2xl w-full max-w-4xl h-[90vh] p-6 flex flex-col" 
            onClick={(e) => e.stopPropagation()} 
          > 
            <h3 className="font-semibold text-lg">{modalProject.title}</h3> 

            {/* PDF FIXED VIEWPORT */} 
            <div className="mt-4 flex-1 min-h-0 rounded-lg overflow-hidden bg-black/5"> 
              <iframe 
                src={modalProject.pdfUrl} 
                className="w-full h-full" 
                title={modalProject.title} 
              /> 
            </div> 

            <button 
              onClick={() => setModalProject(null)} 
              className="mt-4 btn-shimmer text-sm" 
            > 
              Close 
            </button> 
          </div> 

        </div> 
      )} 
    </> 
  ); 
}