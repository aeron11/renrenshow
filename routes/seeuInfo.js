var resume = require('../models/resume');
var url = require('url');

/* GET demo page. */
exports.awards = function(req, res) {
	var urls=url.parse(req.url, true).query;

	resume.findByUname(urls.uname, function(err, rs) {
		if (err) {
			res.redirect('/error');
		} else {
			if (rs) {
				console.log(rs.  Certificate6[urls.ids]);
				allres=rs;
				res.render('./userResume/userSCI/awardInfo', {
					title: '荣誉奖励',
					uName: urls.uname,
					rs: rs.  Certificate6[urls.ids]
				});
			} else {
				res.redirect('/error');
			}
		}
	});
};

exports.companys1 = function(req, res) {
	var urls=url.parse(req.url, true).query;

	resume.findByUname(urls.uname, function(err, rs) {
		if (err) {
			res.redirect('/error');
		} else {
			if (rs) {
				console.log(rs. experience4[urls.ids]);
				allres=rs;
				res.render('./userResume/userSCI/companyInfo', {
					title: '实习经历',
					uName: urls.uname,
					jobTyp: '实习',
					rs: rs. experience4[urls.ids]
				});
			} else {
				res.redirect('/error');
			}
		}
	});
};

exports.companys2 = function(req, res) {
	var urls=url.parse(req.url, true).query;

	resume.findByUname(urls.uname, function(err, rs) {
		if (err) {
			res.redirect('/error');
		} else {
			if (rs) {
				console.log(rs. work5[urls.ids]);
				allres=rs;
				res.render('./userResume/userSCI/companyInfo', {
					title: '工作经历',
					uName: urls.uname,
					jobTyp: '正式工作',
					rs: rs. work5[urls.ids]
				});
			} else {
				res.redirect('/error');
			}
		}
	});
};

exports.schools = function(req, res) {
	var urls=url.parse(req.url, true).query;

	resume.findByUname(urls.uname, function(err, rs) {
		if (err) {
			res.redirect('/error');
		} else {
			if (rs) {
				console.log(rs.schools3[urls.ids]);
				allres=rs;
				res.render('./userResume/userSCI/schoolInfo', {
					title: '教育经历',
					uName: urls.uname,
					rs: rs.schools3[urls.ids]
				});
			} else {
				res.redirect('/error');
			}
		}
	});

};

exports.works = function(req, res) {
	var urls=url.parse(req.url, true).query;

	resume.findByUname(urls.uname, function(err, rs) {
		if (err) {
			res.redirect('/error');
		} else {
			if (rs) {
				console.log(rs.pWorks7[urls.ids]);
				allres=rs;
				res.render('./userResume/userSCI/worksInfo', {
					title: '作品展示',
					uName: urls.uname,
					rs: rs.pWorks7[urls.ids]
				});
			} else {
				res.redirect('/error');
			}
		}
	});

};