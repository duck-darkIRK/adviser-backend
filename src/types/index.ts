import { User } from './entities/user.entity';
import { Major } from './entities/major.entity';
import { Transcript } from './entities/transcript.entity';
import { Class } from './entities/class.entity';
import { Subject } from './entities/subject.entity';
import { Notification } from './entities/notification.entity';
import { Mailbox } from './entities/mailbox.entity';
import { Mail } from './entities/mail.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Timetable } from './entities/timetable.entity';
import { TimetableSheet } from './entities/timetableSheet.entity';

// DTO imports for each module
import { CreateClassDto } from './dto/class/create-class.dto';
import { UpdateClassDto } from './dto/class/update-class.dto';
import { CreateCommentDto } from './dto/comment/create-comment.dto';
import { UpdateCommentDto } from './dto/comment/update-comment.dto';
import { CreateMailDto } from './dto/mail/create-mail.dto';
import { UpdateMailDto } from './dto/mail/update-mail.dto';
import { CreateMailboxDto } from './dto/mailbox/create-mailbox.dto';
import { UpdateMailboxDto } from './dto/mailbox/update-mailbox.dto';
import { CreateMajorDto } from './dto/major/create-major.dto';
import { UpdateMajorDto } from './dto/major/update-major.dto';
import { CreateNotificationDto } from './dto/notification/create-notification.dto';
import { UpdateNotificationDto } from './dto/notification/update-notification.dto';
import { CreatePostDto } from './dto/post/create-post.dto';
import { UpdatePostDto } from './dto/post/update-post.dto';
import { CreateSubjectDto } from './dto/subject/create-subject.dto';
import { UpdateSubjectDto } from './dto/subject/update-subject.dto';
import { CreateTimetableDto } from './dto/timetable/create-timetable.dto';
import { UpdateTimetableDto } from './dto/timetable/update-timetable.dto';
import { CreateTimetableSheetDto } from './dto/timetablesheet/create-timetablesheet.dto';
import { UpdateTimetableSheetDto } from './dto/timetablesheet/update-timetablesheet.dto';
import { CreateTranscriptDto } from './dto/transcript/create-transcript.dto';
import { UpdateTranscriptDto } from './dto/transcript/update-transcript.dto';
import { CreateUserDto } from './dto/user/create-user.dto';
import { UpdateUserDto } from './dto/user/update-user.dto';

export {
    User,
    Major,
    Transcript,
    Class,
    Subject,
    Notification,
    Mailbox,
    Mail,
    Post,
    Comment,
    Timetable,
    TimetableSheet,
    CreateClassDto,
    UpdateClassDto,
    CreateCommentDto,
    UpdateCommentDto,
    CreateMailDto,
    UpdateMailDto,
    CreateMailboxDto,
    UpdateMailboxDto,
    CreateMajorDto,
    UpdateMajorDto,
    CreateNotificationDto,
    UpdateNotificationDto,
    CreatePostDto,
    UpdatePostDto,
    CreateSubjectDto,
    UpdateSubjectDto,
    CreateTimetableDto,
    UpdateTimetableDto,
    CreateTimetableSheetDto,
    UpdateTimetableSheetDto,
    CreateTranscriptDto,
    UpdateTranscriptDto,
    CreateUserDto,
    UpdateUserDto,
};
