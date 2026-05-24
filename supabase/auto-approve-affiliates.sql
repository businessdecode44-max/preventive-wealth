alter table public.affiliates
  alter column status set default 'approved';

update public.affiliates
set status = 'approved'
where status = 'pending';
