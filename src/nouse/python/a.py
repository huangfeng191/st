def jws(func):
    
    def __decor(self, *args, **kwArgs):
        
        cbk = None
        method = web.ctx.env['REQUEST_METHOD']
        
        if method == 'GET':
            vals = web.input(data=None)
            if '__callback' in vals:
              cbk = vals['__callback']
              data = unquote(vals['data'])
            else:
              data = unquote(web.ctx.env['QUERY_STRING'])
              
        elif method == 'POST':
            data = web.data()
            
        try:
            if data=='':
                data={}
            else:
                data = json.loads(data)
            r = json.dumps(OrderedDict([("Code",0),("Message","OK"), ("Response",func(self, *args, **data))]))
        except HDScadaException, e:
            logging.exception(e);
            r = json.dumps(OrderedDict([("Code",e.code),("Message",e.msg), ("Response", {})]))
        except Exception, e:
            logging.exception(e);
            r = json.dumps(OrderedDict([("Code",99999),("Message",str(e)), ("Response", {})]))
        if cbk:
            web.header("Content-Type", "application/javascript; charset=UTF-8")
            return "".join([cbk, '(', r, ')'])
            
        web.header("Content-Type", "application/json; charset=UTF-8")
        return r
        
    return __decor