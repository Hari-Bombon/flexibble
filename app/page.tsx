import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/action";

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

const SearchParams ={
  category?: string;
  endcursor?: string;
}

type Props = {
  searchParams: SearchParams
}

export  const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams:{category , endcursor}}: Props) => {
  const data = (await fetchAllProjects(category , endcursor)) as ProjectSearch;
  const projectToDisplay = data?.projectSearch?.edges || [];

  if (projectToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories/>
        <p className="no-result-text">No projects found, go create some first</p>
      </section>
    );
  }

  const pagination = data?.projectSearch?.pageInfo?;
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories/>
      <section className="projects-grid">
        {projectToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node?.id} 
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>
     <LoadMore
        startCursor = {pagination.startCursor}
        endCursor = {pagination.endCursor}
        hasPreviousPage = {pagination.haspreviousPage}
       hasNextPage = {pagination.hasNextPage}
        
      />
    </section>
  );
};

export default Home;
