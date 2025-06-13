create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path=''
as $$
begin
  if new.raw_app_meta_data is not null then
    if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'email' then
      if new.raw_app_meta_data ? 'name' AND new.raw_app_meta_data ? 'username'
      insert into public.profiles (profile_id, name, username)
      values (new.id, new.raw_app_meta_data ->> 'name', new.raw_app_meta_data ->> 'username') 
      else
      values (new.id, 'Anonymous', substr(md5(random()::text), 1, 8)) 
    end if;
  end if;
  return new; 
end;
$$;

create trigger user_to_profile_trigger
after insert on auth.users
for each row execute function public.handle_new_user();