class CategoryFeed {
    constructor({ version, encoding, feed }) {
        this.version = version;
        this.encoding = encoding;
        this.feed = feed;
    }
}

class Feed {
    constructor({
        xmlLang,
        xmlns,
        xmlnsDcterms,
        xmlnsThr,
        xmlnsApp,
        xmlnsOpensearch,
        xmlnsOpds,
        xmlnsXsi,
        xmlnsOdl,
        xmlnsSchema,
        id,
        title,
        updated,
        icon,
        author,
        link,
        opensearchTotalResults,
        opensearchItemsPerPage,
        opensearchStartIndex,
        entry,
    }) {
        this.xmlLang = xmlLang;
        this.xmlns = xmlns;
        this.xmlnsDcterms = xmlnsDcterms;
        this.xmlnsThr = xmlnsThr;
        this.xmlnsApp = xmlnsApp;
        this.xmlnsOpensearch = xmlnsOpensearch;
        this.xmlnsOpds = xmlnsOpds;
        this.xmlnsXsi = xmlnsXsi;
        this.xmlnsOdl = xmlnsOdl;
        this.xmlnsSchema = xmlnsSchema;
        this.id = id;
        this.title = title;
        this.updated = updated;
        this.icon = icon;
        this.author = author;
        this.link = link;
        this.opensearchTotalResults = opensearchTotalResults;
        this.opensearchItemsPerPage = opensearchItemsPerPage;
        this.opensearchStartIndex = opensearchStartIndex;
        this.entry = entry;
    }
}

class Id {
    constructor({ t }) {
        this.t = t;
    }
}

class Author {
    constructor({ name, uri, email }) {
        this.name = name;
        this.uri = uri;
        this.email = email;
    }
}

class Link {
    constructor({
        rel,
        type,
        href,
        title,
        opdsActiveFacet,
        opdsFacetGroup,
        thrCount,
    }) {
        this.rel = rel;
        this.type = type;
        this.href = href;
        this.title = title;
        this.opdsActiveFacet = opdsActiveFacet;
        this.opdsFacetGroup = opdsFacetGroup;
        this.thrCount = thrCount;
    }
}

class Entry {
    constructor({
        title,
        id,
        author,
        published,
        updated,
        dctermsLanguage,
        dctermsPublisher,
        dctermsIssued,
        summary,
        category,
        link,
        schemaSeries,
    }) {
        this.title = title;
        this.id = id;
        this.author = author;
        this.published = published;
        this.updated = updated;
        this.dctermsLanguage = dctermsLanguage;
        this.dctermsPublisher = dctermsPublisher;
        this.dctermsIssued = dctermsIssued;
        this.summary = summary;
        this.category = category;
        this.link = link;
        this.schemaSeries = schemaSeries;
    }
}

class Author1 {
    constructor({ name, uri }) {
        this.name = name;
        this.uri = uri;
    }
}

class Category {
    constructor({ label, term, scheme }) {
        this.label = label;
        this.term = term;
        this.scheme = scheme;
    }
}

class Link1 {
    constructor({ type, rel, title, href }) {
        this.type = type;
        this.rel = rel;
        this.title = title;
        this.href = href;
    }
}

class SchemaSeries {
    constructor({ schemaPosition, schemaName, schemaUrl }) {
        this.schemaPosition = schemaPosition;
        this.schemaName = schemaName;
        this.schemaUrl = schemaUrl;
    }
}



