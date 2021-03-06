/*
【文章增加一篇时，tags_index的触发器】
*/
CREATE TRIGGER `add_trigger_before` 
BEFORE INSERT ON `papers_table`
FOR EACH ROW 
BEGIN
SET new.content = REPLACE(REPLACE(new.content, CHAR(10), ''), CHAR(13), '');
SET new.timeline = left(new.publish_date, 7);
END

CREATE TRIGGER `add_trigger_after` 
AFTER INSERT ON `papers_table`
FOR EACH ROW 
BEGIN
SET @count1 = (SELECT COUNT(*) FROM timeline_index WHERE timeline = new.timeline);
SET @count2 = (SELECT COUNT(*) FROM tags_index WHERE name = new.tag);
IF @count1 = 0 THEN
INSERT INTO timeline_index(timeline, papers_count) VALUES(new.timeline, 1);
ELSE
UPDATE timeline_index SET papers_count = papers_count + 1 WHERE timeline = new.timeline;
END IF;
IF @count2 = 0 THEN
INSERT INTO tags_index(name, papers_count) VALUES(new.tag, 1);
ELSE
UPDATE tags_index SET papers_count = papers_count + 1 WHERE name = new.tag;
END IF;
END

/*
【文章删除一篇时，tags_index的触发器、comment_table的触发器、subcomment_table的触发器】
*/
CREATE TRIGGER `delete_trigger` 
AFTER DELETE ON `papers_table`
FOR EACH ROW
BEGIN
UPDATE tags_index SET papers_count = papers_count - 1 WHERE name = old.tag;
UPDATE timeline_index SET papers_count = papers_count - 1 WHERE timeline = old.timeline;
DELETE FROM comment_table WHERE paper_id = old.id;
DELETE FROM subcomment_table WHERE paper_id = old.id;
END

/*
【文章修改一篇时，tags_index的触发器】（暂时用不到）
*/
CREATE TRIGGER `update_trigger_before` 
BEFORE UPDATE ON `papers_table`
FOR EACH ROW 
SET new.content = REPLACE(REPLACE(new.content, CHAR(10), ''), CHAR(13), '')

CREATE TRIGGER `update_trigger_after` 
AFTER UPDATE ON `papers_table`
FOR EACH ROW 
BEGIN
UPDATE tags_index SET papers_count = papers_count - 1 WHERE name = old.tag;
UPDATE tags_index SET papers_count = papers_count + 1 WHERE name = new.tag;
END
