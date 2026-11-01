import build_hakemi as h
from urllib.parse import quote
b=h.b
T=h.T;U=h.U;S=h.S;Q=h.Q;E=h.E;P=h.P;D=h.D;L=h.L
def A(part,title,pages,overview,rows,memory,questions,more=''):
    body=T(['نکته','توضیح'],rows)+more
    L(part,title,pages,overview,['مفهوم‌های اصلی درس را با زبان خودم توضیح دهم.','تفاوت‌ها و رابطهٔ علت و معلولی را با مثال بیان کنم.'],body,memory,questions,['اصطلاح‌های کلیدی را تعریف می‌کنم.','رابطهٔ علت و پیامد را از حافظه توضیح می‌دهم.'])
def start(name,slug,parts):
    h.SOURCE=quote(name+'.pdf');b.lessons=[]
    h.PARTS={i+1:(title,sub) for i,(title,sub) in enumerate(parts)}
    h.mixed=[];h.source_questions=[];h.review='';h.coverage=[]
def finish(name,slug,ordinal,sessions,coverage,mixed,source_questions=None):
    h.coverage=coverage;h.mixed=mixed;h.source_questions=source_questions or []
    h.review=T(['درس','یادآوری فشرده','صفحهٔ منبع'],[[l['title'],l['memory'],h.refs(l['pages'])] for l in b.lessons])
    h.build(name,slug,ordinal,sessions)
