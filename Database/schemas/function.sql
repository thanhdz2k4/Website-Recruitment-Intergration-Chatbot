
create or replace function get_company_infor()
returns setof record
language sql
as $$
select
  c.company_id, 
  c.name,
  c.website,
  c.size,
  c.description,
  string_agg(distinct a.address_detail, ' / ') as addresses,
  string_agg(distinct i.name, ', ') as industries
from
  company c
  join address a on a.company_id = c.company_id
  join company_industry ci on ci.company_id = c.company_id
  join industry i on i.industry_id = ci.industry_id
group by
  c.company_id, c.name, c.website, c.size, c.description;
$$;


create or replace function get_job_posting_infor()
returns setof record
language sql
as $$
select
  j.position_name,
  j.job_description,
  j.requirements,
  j.salary,
  j.deadline,
  j.experience_years,
  j.education_level,
  j.benefits,
  j.working_time,
  j.status,
  string_agg(distinct wt.work_type_name, ', ') as work_types,
  string_agg(distinct i.name, ', ') as industries,
  string_agg(distinct s.skill_name, ', ') as skills
from
  job_posting j
  join work_type wt on wt.job_posting_id = j.job_posting_id
  join job_posting_industry jpi on jpi.job_posting_id = j.job_posting_id
  join industry i on jpi.industry_id = i.industry_id
  join job_posting_skill jpk on jpk.job_posting_id = j.job_posting_id
  join skill s on s.skill_id = jpk.skill_id
group by
  j.job_posting_id, j.job_description
$$;
