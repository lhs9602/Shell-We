--drop table if exists member CASCADE;
--drop table if exists room CASCADE;
--drop table if exists message CASCADE;
--drop table if exists member_room CASCADE;
--
--create table member (
--	member_id bigint generated by default as identity,
--	email varchar(255),
--	display_name varchar(255),
--	password varchar(255),
--	profile_url varchar(255),
--	EMAIL_VERIFICATION_STATUS boolean,
--	created_at timestamp,
--	modified_at timestamp,
--	primary key (member_id)
--);
--
--
--create table room (
--	room_id bigint NOT NULL AUTO_INCREMENT,
--	created_at timestamp,
--	modified_at timestamp,
--	primary key (room_id)
--);
--
--create table member_room(
--    member_room_id bigint NOT NULL AUTO_INCREMENT,
--    member_id bigint,
--    room_id bigint,
--    active boolean,
--    primary key (member_room_id),
--    foreign key (member_id) REFERENCES member (member_id),
--    foreign key (room_id) REFERENCES room (room_id)
--);
--
--create table message(
--    message_id bigint NOT NULL AUTO_INCREMENT,
--    payload varchar(255),
--    created_at timestamp,
--    modified_at timestamp,
--    unread boolean,
--    notification boolean,
--    room_id bigint,
--    member_id bigint,
--    primary key (message_id),
--    foreign key (member_id) REFERENCES member (member_id),
--    foreign key (room_id) REFERENCES room (room_id)
--);
