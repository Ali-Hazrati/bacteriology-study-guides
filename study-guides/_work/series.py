import build_hakemi as h
from urllib.parse import quote
b=h.b
T=h.T;U=h.U;S=h.S;W=h.W;Q=h.Q;E=h.E;P=h.P;D=h.D;L=h.L
def A(part,title,pages,overview,rows,memory,questions,more='',warning=None):
    body=T(['نکته','توضیح'],rows)+more
    if warning:body+=W(warning[0],warning[1],pages)
    L(part,title,pages,overview,['مفهوم‌ها و ویژگی‌های این درس را توضیح دهم.','مقایسه یا مسیر علت و معلول را بدون نگاه بنویسم.'],body,memory,questions,['اصطلاح‌های کلیدی را تعریف می‌کنم.','رابطهٔ علت و پیامد را از حافظه توضیح می‌دهم.'])
def start(name,slug,parts):
    h.SOURCE=quote(name+'.pdf');b.lessons=[];b.flags=[]
    h.PARTS={i+1:(title,sub) for i,(title,sub) in enumerate(parts)}
    h.mixed=[];h.source_questions=[];h.review='';h.coverage=[]
def finish(name,slug,ordinal,sessions,coverage,mixed,source_questions=None):
    h.coverage=coverage;h.mixed=mixed;h.source_questions=source_questions or []
    h.review=T(['درس','یادآوری فشرده','صفحهٔ منبع'],[[l['title'],l['memory'],h.refs(l['pages'])] for l in b.lessons])
    h.build(name,slug,ordinal,sessions)
