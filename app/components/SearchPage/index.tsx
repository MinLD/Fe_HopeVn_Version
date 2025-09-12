"use client";
import { JobPostingProps } from "@/app/componentEmployer/JobPosting";

import { dataPost as DataPostType } from "@/app/types/post"; // Đổi tên để tránh xung đột
import { Ty_PostVolunteer } from "@/app/components/PendingCompanyCard";
import JobCard from "@/app/components/jobCart/JobCard";
import CommentPostCard from "@/app/componentsPostHelp/CommentPostCart";
import PostCard from "@/app/componentsPostHelp/posts/PostCard";
import { useState } from "react";
import VolunteerCard from "@/app/components/VolunteerCart";
type Props = {
  dataPosts: DataPostType[];
  dataPostsVolunteer: Ty_PostVolunteer[];
  dataJobs: JobPostingProps[];
  token: string | null;
};

function SearchPage({ dataPosts, dataPostsVolunteer, dataJobs, token }: Props) {
  const [isComment, setIsComment] = useState<number>(-1);
  return (
    <div className="space-y-12">
      {/* Hiển thị kết quả Việc làm */}
      {dataJobs.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold border-b-2 border-green-500 pb-2 mb-4">
            Việc làm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataJobs.map((job) => (
              <div key={job.id}>
                <JobCard job={job} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hiển thị kết quả Bài viết */}
      {dataPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold border-b-2 border-green-500 pb-2 mb-4">
            Bài viết
          </h2>
          <div className="space-y-4">
            {dataPosts.map((i, k) => (
              <div key={i.id} className="mb-6">
                <PostCard
                  key={i.id}
                  post={i}
                  onClick={() => setIsComment(i.id)}
                  token={token || ""}
                />
                {isComment === i.id && (
                  <>
                    <CommentPostCard
                      authorName={i.name}
                      onClose={() => setIsComment(-1)}
                      id={i.id}
                      token={token || ""}
                    >
                      <PostCard
                        type="comment"
                        token={token || ""}
                        key={k}
                        post={i}
                        onClick={() => setIsComment(i.id)}
                      />
                    </CommentPostCard>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Hiển thị kết quả Bài viết hoàn vốn */}
      {dataPostsVolunteer.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold border-b-2 border-green-500 pb-2 mb-4">
            Hoàn cảnh cần giúp đỡ
          </h2>
          <div className="space-y-4">
            {dataPostsVolunteer.map((i) => (
              <div key={i.id} className="mb-6">
                <VolunteerCard
                  key={i.id}
                  post={i}
                  token={token || ""}
                  onClick={() => setIsComment(i.id)}
                />
                {isComment === i.id && (
                  <>
                    <CommentPostCard
                      authorName={i.name}
                      onClose={() => setIsComment(-1)}
                      id={i.id}
                      token={token || ""}
                    >
                      <VolunteerCard key={i.id} post={i} token={token || ""} />
                    </CommentPostCard>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default SearchPage;
